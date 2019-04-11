const mongoose = require('mongoose');
const moment = require('moment');
const RacerTime = require('../models/racerTime');


exports.getTimesByRaceId = async (req, res, next) => {
    const {raceId} = req.params;
  try {
      const racerTimes = await RacerTime
          .find({race: raceId})
          .populate('racer')
          .populate('race')
          .exec();

      res.status(200).json({racerTimes});
  }  catch (err) {
      next(err);
  }
};

exports.createStartingTime = async (req, res, next) => {
    const {race, racer} = req.params;
  try {
    const racerTime = new RacerTime ({
        _id: new mongoose.Types.ObjectId(),
        startingTime: new Date(req.body.startingTime),
        racer,
        race
    });
    const result = await racerTime.save();
    console.log(result);
      res.status(201).json({
          message: "starting time created for racer on race"
      })
  } catch (err) {
    next(err);
  }
};

exports.setFinishingTime = async (req, res, next) => {
    const {timeId} = req.params;

    try {
      const result = await RacerTime.updateOne({_id: timeId}, {$set: {finishingTime: new Date(req.body.finishingTime)}})
          .exec();
      res.status(201).json({
          message: "finishing time set"
      })
    } catch (err) {
        next(err);
    }
};

exports.setNeutralTimes = async (req, res, next) => {
  const {timeId} = req.params;
  const {neutralZoneOne, neutralZoneTwo, neutralZoneThree} = req.body;

  try{
      const result = await RacerTime.updateOne({_id: timeId},
          {$set: {
                neutralZoneOne: neutralZoneOne,
                neutralZoneTwo: neutralZoneTwo,
                neutralZoneThree: neutralZoneThree
            }
        })
          .exec();
      res.status(201).json({
          message: "neutral zones set"
      })
  } catch (err) {
      next(err)
  }
};

exports.setIfDNF = async (req, res, next) => {
  const {timeId} = req.params;
  const {dnf} = req.body;

  try {
      const result = await RacerTime.updateOne({_id: timeId}, {$set: {dnf: dnf}}).exec();
      res.status(201).json({
          message: "if racer dnf modified"
      })
  } catch (err) {
      next(err)
  }
};

exports.setPenalty = async (req, res, next) => {
  const {timeId} = req.params;
  const {penalty} = req.body;

  try {
      const result = await RacerTime.updateOne({_id: timeId}, {$set: {penalty: penalty}}).exec();
      res.stat(201).json({
          message: "racer penalized"
      })
  } catch (err) {
      next(err)
  }
};

exports.saveFinalTime = async (req, res, next) => {
  const {timeId} = req.params;

  try {
     const racerTime = await RacerTime.findOne({_id: timeId}).exec();
     const finalTime = calculateFinalTime(racerTime);
      RacerTime.updateOne({_id: timeId}, {$set: {finalTime}}).exec();
      res.status(201).json({
          message: "final time saved"
      })
  } catch (err) {
      next(err)
  }
};

const calculateFinalTime = (racerTime) => {
    if (racerTime.dnf) return null;
    const {startingTime, finishingTime, neutralZoneOne, neutralZoneTwo, neutralZoneThree, penalty} = racerTime;

    const updatedFinishingTime = moment(finishingTime)
        .subtract(neutralZoneOne, 'seconds')
        .subtract(neutralZoneTwo, 'seconds')
        .subtract(neutralZoneThree, 'seconds');

    if (penalty){
        updatedFinishingTime.add(2, 'minutes');
    }

    const finalTime = moment.duration(updatedFinishingTime.diff(moment(startingTime)));
    return `${finalTime.hours()}:${finalTime.minutes()}:${finalTime.seconds()}`;
};
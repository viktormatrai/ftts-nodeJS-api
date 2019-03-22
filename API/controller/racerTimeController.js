
const mongoose = require('mongoose');
const moment = require('moment');
const RacerTime = require('../models/racerTime');

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
      console.log('finalTime', finalTime);
      RacerTime.updateOne({_id: timeId}, {$set: {finalTime}}).exec();
      res.status(201).json({
          message: "final time saved"
      })
  } catch (err) {
      next(err)
  }
};

const calculateFinalTime = (racerTime) => {
    const {startingTime, finishingTime, neutralZoneOne, neutralZoneTwo, neutralZoneThree, penalty, dnf} = racerTime;

    const finalTime = moment(moment(finishingTime).diff(moment(startingTime)))
        .subtract(neutralZoneOne, 'seconds')
        .subtract(neutralZoneTwo, 'seconds')
        .subtract(neutralZoneThree, 'seconds');

    if (penalty){
        moment(finalTime).add(2, 'minutes');
    }

    return dnf ? null : moment(finalTime).format("HH:mm:ss");

};

const mongoose = require('mongoose');
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

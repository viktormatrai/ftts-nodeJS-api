
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


const lodash = require('lodash');
const RacerTime = require('../models/racerTime');
const User = require('../models/user');
const Team = require('../models/team');


exports.calculatePoints = async (req, res, next) => {
    const {raceId} = req.body;

    try {
       const racerTimesForRace = await RacerTime.find({_id: raceId}).sort({finalTime: -1}).exec();
       console.log(racerTimesForRace);


    } catch (err) {
        next(err)
    }
};

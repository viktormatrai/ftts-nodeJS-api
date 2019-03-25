const RacerTime = require('../models/racerTime');
const User = require('../models/user');
const Team = require('../models/team');


exports.addPointsToRacers = async (req, res, next) => {
    const {finalTime, raceId} = req.body;

    try {
        let points = [20, 16, 14, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
        const timesInDescendingOrder = arrangeTimesDescending(raceId).limit(15);
        const finalTimesEqualToTheFirstFifteen = RacerTime.find({finalTime: {$eq: timesInDescendingOrder}}).exec();



    } catch (err) {
        next(err)
    }
};

const arrangeTimesDescending = (raceId) => {
    const sortedTimes = RacerTime.find({_id: raceId}).sort({finalTime: -1})
      .exec();
    console.log(sortedTimes);
    return sortedTimes;
};


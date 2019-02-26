const mongoose = require('mongoose');

const racerTime = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    racer: {type: mongoose.Types.ObjectId, ref: 'racer'},
    race: {type: mongoose.Types.ObjectId, ref: 'race'},
    startingTime: {type: Date},
    finishingTime: {type: Date},
    neutralZoneOne: {type: Number},
    neutralZoneTwo: {type: Number},
    neutralZoneThree: {type: Number},
    penalty: {type: Number, max: 1, default: 0},
    dnf: {type: Number, max: 1, default: 0}
});

module.exports = mongoose.model('racerTime', racerTime);
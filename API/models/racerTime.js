const mongoose = require('mongoose');

const racerTime = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    racer: {type: mongoose.Types.ObjectId, ref: 'user'},
    race: {type: mongoose.Types.ObjectId, ref: 'race'},
    startingTime: {type: Date},
    finishingTime: {type: Date},
    neutralZoneOne: {type: Number},
    neutralZoneTwo: {type: Number},
    neutralZoneThree: {type: Number},
    penalty: {type: Boolean, default: false},
    dnf: {type: Boolean, default: false}
});

module.exports = mongoose.model('racerTime', racerTime);
const mongoose = require('mongoose');

const racerTime = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    racer: {type: mongoose.Types.ObjectId, ref: 'user'},
    race: {type: mongoose.Types.ObjectId, ref: 'race'},
    startingTime: {type: Date},
    finishingTime: {type: Date},
    finalTime: {type: String},
    neutralZoneOne: {type: Number},
    neutralZoneTwo: {type: Number},
    neutralZoneThree: {type: Number},
    penalty: {type: Boolean, default: false},
    dnf: {type: Boolean, default: false},
    points: {type:Number, default: 0, max:20}
});

module.exports = mongoose.model('racerTime', racerTime);
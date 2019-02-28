const mongoose = require('mongoose');

const race = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    raceName: {type: String, required: true},
    raceCode: {type: String, required: true},
    dateOfRace: {type: Date},
    distance: {type: Number},
    elevation: {type: Number},
    racers: {type: mongoose.Types.ObjectId, ref: 'racer'},
    individual: {type: Boolean, required: true, default: false},
    ifCalculated:{type: Boolean, required:true}
});

module.exports = mongoose.model('race', race);
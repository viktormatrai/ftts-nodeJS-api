const mongoose = require('mongoose');

const race = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    raceName: {type: String, required: true},
    dateOfRace: {type: Date},
    distance: {type: Number},
    racers: {type: mongoose.Types.ObjectId, ref: 'racer'},
    volunteers: {types: mongoose.Types.ObjectId, ref: 'volunteer'}
});

module.exports = mongoose.model('race', race);
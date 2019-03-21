const mongoose = require('mongoose');

const team = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    teamName: {type: String, required: true},
    racers: {type: mongoose.Types.ObjectId, ref: 'users'},
    races: {type: mongoose.Types.ObjectId, ref: 'race'},
    teamPoints: {type: Number, default: 0}
});

module.exports = mongoose.model('team', team);
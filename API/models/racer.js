const mongoose = require('mongoose');

const racer = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    nickName: {type: String},
    gender: {type: Number, max: 1, required: true},
    team: {type: mongoose.Schema.Types.ObjectId, ref: 'team'},
    race: {type: mongoose.Schema.Types.ObjectId, ref: 'race'},
    email: {
            type: String,
            required: true,
            unique: true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
    password: {type: String, required: true},
    points: {type: Number},
    tag: {type: mongoose.Schema.Types.ObjectId, ref: 'tag'}
});

module.exports = mongoose.model('racer', racer);
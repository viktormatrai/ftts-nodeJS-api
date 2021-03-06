const mongoose = require('mongoose');

const users = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    admin: {type: Boolean, default: false},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    nickName: {type: String},
    gender: {type: Number, max: 1},
    team: {
            id: {type: mongoose.Schema.Types.ObjectId, ref: 'team'},
            teamName: String
    },
    races: {type: mongoose.Schema.Types.ObjectId, ref: 'race'},
    email: {
            type: String,
            required: true,
            unique: true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {type: String, required: true},
    points: {type: Number, default: 0},
    tag: {type: mongoose.Schema.Types.ObjectId, ref: 'tag'}
});

module.exports = mongoose.model('user', users);
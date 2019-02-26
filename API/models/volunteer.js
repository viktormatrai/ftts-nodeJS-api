const mongoose = require('mongoose');

const volunteer = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String},
    race: {type: mongoose.Types.ObjectId, ref: 'race'}
});

modules.export = mongoose.model('volunteer', volunteer);
const mongoose = require('mongoose')
const Schema = mongoose.Schema ;
var passportLocaMongoose = require('passport-local-mongoose')

const User = new Schema({
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    admin: {
        type: Boolean,
        default: false
    }
});

User.plugin(passportLocaMongoose);

module.exports = mongoose.model('User',User);
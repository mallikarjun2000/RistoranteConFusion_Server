const mongoose = require('mongoose')
const Schema = mongoose.Schema ;
var passportLocaMongoose = require('passport-local-mongoose')

const User = new Schema({
    
    admin: {
        type: Boolean,
        default: false
    }
});

User.plugin(passportLocaMongoose);

module.exports = mongoose.model('User',User);
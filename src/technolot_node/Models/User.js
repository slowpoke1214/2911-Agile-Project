var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    roles: {
        type: Array
    }
});

userSchema.plugin(passportLocalMongoose);
var User = mongoose.model('User', userSchema);
module.exports = User;

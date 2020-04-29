const User = require('../Models/User');
var passport = require('passport');

exports.RegisterUser = async function(req, res) {
    var password = req.body.password;
    var passwordConfirm = req.body.passwordConfirm;

    if (password == passwordConfirm) {
        var newUser = new User({
            email: req.body.email,
            username: req.body.username
        });

        User.register(new User(newUser), req.body.password, 
            function(err, _) {
                if (err) {
                    return res.json({
                        errorMessage: err,
                    });
                }
                passport.authenticate('local') (req, res, function() {
                    res.json({
                        username: newUser.username,
                        errorMessage: '',
                    });
                })
        });
    } else {
        res.json({
            user: newUser,
            errorMessage: {
                name: "Passwords do not match.",
                message: ""
            }
        })
    }
};

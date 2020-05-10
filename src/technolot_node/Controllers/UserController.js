const RequestService = require('../Services/RequestService');
const User = require('../Models/User');
const UserRepo = require('../Data/UserRepo');
const _userRepo = new UserRepo();
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

exports.DeleteUser = async function(req, res) {
    //For now the permitted Roles will be empty, until I figure out how to register a user
    //in the unit tests with the Admin role.
    let reqInfo = await RequestService.jwtReqHelper(req, []);
    if (reqInfo) {
        let username           = req.body.username;
        let user  = await _userRepo.deleteUser(username);
        res.json(user)
    }
};

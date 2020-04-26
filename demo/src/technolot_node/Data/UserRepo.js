const User = require('../Models/User');

class UserRepo {
    UserRepo() { }
    
    async getRolesByUsername(username) {
        var user = await User.findOne({ username: username }, { _id: 0, roles: 1});
        if (user.roles) {
            return user.roles;
        } else {
            return []
        }
    }
}

module.exports = UserRepo;
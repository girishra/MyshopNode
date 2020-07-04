//passport strategy for authenticate email and password
const localStratagy = require('passport-local').Strategy;
const User = require('../../app/model/user');
const response = require('../../config/response')
module.exports = new localStratagy({
        usernameField: 'email',
        passwordField: 'password',
    },
    async (email, password, callback) => {
        try {
            //find user data from database
            let user = await User.findOne({ email });
            if (user) {
                //if user found then validate password with signup password
                if (!user.isValidPassword(password)) {
                    //if not valid password then send password if not correct
                    callback(null, false, { "message": "Password is Incorrect!" });
                } else if(user.isValidPassword(password) && user.status == 'ACTIVE') {
                    callback(null, user, { "message": "Successfully LoggedIn!" });
                } else {
                    callback(null, user, { message: "unAuthrozed Access or Invalid credentials"}); 
                }
            } else {
                callback(null, false, { "message": "User does not exist!" });
            }
        }
        catch (error) {
            callback(error, false, { "message": "Some error occured " });
        }
    }
);


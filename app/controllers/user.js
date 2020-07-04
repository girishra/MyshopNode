'use strict'
const response = require('../../config/response')
const User = require('../model/user');
const passport = require('passport');
const jwtService = require('../../service/jwtSevice');
'use strict'
module.exports =  {
    //User signup
    signUp: async (req, res)=> {
        try {
            //for email check
            if (!req.body.email)
                return response.error(res, { message: "Email is necessary" });
            //for password check
            if (!req.body.password)
                return response.error(res, { message: "Password is necessary" });
            //make user object contain following details
            let user = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            //encrypt password
            user.password = user.encryptPassword(req.body.password);
            //save user details
            await user.save();
            //send success response
            return response.success(res, user,{ info: "User Successfully Created" })

        } catch(error) {
            //send error response if error
            return response.error(res, error);
        }
    },
    //user login
    login: async (req, res) => {
        try {
            //authenticate user req  from local strategy
            passport.authenticate("local", async (err, user, info) => {
            //if error send error response
            if (err) {
              return response.error(res, err);
            }
            //if not user send unauthorize response
            if (!user) {
              return response.unAuthorize(res, info);
            }
            //create token fron jsonwebtoken
            let token = await new jwtService().createJwtToken({
              id: user._id,
              email: user.email
            });
            //send response if user authorized and token created
            response.success(res, {user:user, token: token, expiresIn: 3600 });
          })(req, res);
        } catch(error) {
            response.error(res, error)
        }
    },
}

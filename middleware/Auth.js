const passport = require("passport");
const response = require("../config/response");
const User = require("./../app/model/user");
module.exports = (req, res, next) => {
  //authenticate req with json web token
  passport.authenticate("jwt", { session: false }, async function(
    err,
    user,
    info
  ) {
    //if error send error response
    if (err) {
      response.error(res, err);
    }
    //if not user then send unauthorized user
    if (!user) {
      response.unAuthorize(res, info);
    }

    //find user data from database
    let userData = await User.findOne({
      _id: user.id
    });
    if (!userData || userData === null) {
      return response.error(res, { info: "not authroizzed" });
    }
    //send user if verified
    req.user = user;

    next();
  })(req, res, next);
};

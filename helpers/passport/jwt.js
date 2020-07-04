//passport strategy to authenticate with token
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require("./../../config/environment/environment");

//make options object to control token extracted from request and verified
const opts = {
    secretOrKey: config.jwt.secretOrKey,
    issuer: config.jwt.issuer,
    audience: config.jwt.audience,
    passReqToCallback: false,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt")
};

//export the strategy
module.exports = new JwtStrategy(opts, function(jwt_payload, done) {
    return done(null, jwt_payload.user, {});
});

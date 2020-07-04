'use strict';
const jwt = require("jsonwebtoken");
const config = require("../config/environment/environment");
module.exports = class jwtService {
    constructor() {}
    createJwtToken(user) {
        return jwt.sign({ user }, config.jwt.secretOrKey, {
            algorithm: config.jwt.algorithm,
            expiresIn: config.jwt.expiresIn,
            issuer: config.jwt.issuer,
            audience: config.jwt.audience
        });
    }
};
const local = require("./local");
const jwt = require("./jwt");
module.exports = (passport) => {
    //passport uses strategies to authenticate requests
    passport.use(local);
    passport.use(jwt);
};


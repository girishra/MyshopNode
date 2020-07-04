const dbConfig = require("../../database/db");
const environments = require("../environment/environment");
module.exports = (app) => {
  dbConfig(environments);
};

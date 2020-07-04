"use strict";
module.exports = (app, passport) => {
  // This is testing route
  app.get("/test", (req, res) => res.send("this is for testing only"));

  // hopemage url just to give OK status with 200 code
  app.get("/", (req, res) => res.send({ status: "OK" }));
  /* API Routes goes here */
  app.use("/Myshop/user/", require("./user_routes")(app, passport));
};

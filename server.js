// All Requires are here
const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const passport = require("passport");
const cors=require('cors')
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors())
app.use("/MySHop/uploads/",express.static('./uploads'))


// Initialize passport
require("./helpers/passport")(passport);

// App configuration
require("./config/server/server_config")(app, passport);

//user routes
require("./routes")(app, passport);

// Run app
app.listen(port , () => {
    console.log('Server Start Successfully connected to port ',port)
})

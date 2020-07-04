'use strict';
const mongoose = require('mongoose');
//make promise global
mongoose.Promise = global.Promise;
module.exports = (config) => {
    //options object to create tuning or connection with mongoose
    const options = {
            keepAlive: 1000,
            useNewUrlParser: true,
            useCreateIndex: true
    };

    //method to create connection with database and create collection
    mongoose.connect(config.db, options, (err, db) => {
        if(err) {
            console.log('Mongoose connection error', err.message);
            // var collections = mongoose.connection.collections;
        }
    });

    //mongoose connection on
    mongoose.connection.on('connected', function() {
        console.log('Mongoose connection success');
    });

    //mongoose connection if disconnected
    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });

    //method if error in connection
    mongoose.connection.on('error', console.error.bind(console, 'MongoDb connection error'));
};

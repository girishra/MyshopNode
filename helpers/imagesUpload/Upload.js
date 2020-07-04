'use strict'

const multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, '../uploads');
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + '_' + Date.now());
    }
});

var upload = multer({ storage:storage }).array('userPhoto', 2);

module.exports = upload
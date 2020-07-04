'use strict';

module.exports = (res, error) => {
    return res.status(200).send({
        status: false,
        app_status:error.app_status,
        message: error.message,
    });
};

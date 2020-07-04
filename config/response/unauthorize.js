'use strict';

module.exports = (res, info) => {
    return res.status(200).send({
        'status': false,
        'message': info.message
    });
};

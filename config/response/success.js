'use strict';

module.exports = (res, data,message="Action Completed Successfully") => {
    return res.status(200).send({
        status: 200,
        message:message,
        data: data,
    });
};

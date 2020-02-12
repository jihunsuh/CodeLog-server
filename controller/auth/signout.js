"use strict";
exports.__esModule = true;
module.exports = {
    post: function (req, res) {
        res
            .clearCookie('token')
            .status(200)
            .send('ok');
    }
};

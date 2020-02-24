"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    post: (req, res) => {
        res
            .clearCookie('token')
            .status(200)
            .send('ok');
    },
};

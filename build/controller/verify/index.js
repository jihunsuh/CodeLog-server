"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = require('express-async-handler');
const { isValid } = require('../../utils/token');
const { userService } = require('../../services');
module.exports = {
    get: asyncHandler(async (req, res) => {
        const { token } = req.cookies;
        let resBody = {
            token: false,
        };
        const decode = await isValid(token);
        if (decode.isValid) {
            resBody.token = true;
            resBody.join_type = decode.userData.user_type;
        }
        res.status(200).send(resBody);
    }),
    post: asyncHandler(async (req, res) => {
        const { token } = req.cookies;
        let userData = null;
        const userResult = await userService.findByToken(token);
        if (userResult.success) {
            userData = userResult.payload;
            delete userData.password;
        }
        if (userData) {
            res.status(200).send({ userData });
        }
        else {
            res.status(200).send({ isLogin: false });
        }
    }),
};

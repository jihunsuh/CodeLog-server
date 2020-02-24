"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = require('express-async-handler');
const { tokenGenerator } = require('../../utils/token');
const { userService } = require('../../services');
module.exports = {
    post: asyncHandler(async (req, res) => {
        const { email, username, password } = req.body;
        const emailOrUsername = email || username;
        const userData = await userService.signin(emailOrUsername, password);
        if (!userData.success) {
            res.status(404).send(`User with ${emailOrUsername} doesn't exist`);
            return;
        }
        if (!userData.payload) {
            res.status(403).send(`wrong password`);
            return;
        }
        const token = await tokenGenerator({
            email: userData.payload.email,
            password: userData.payload.password,
            user_type: 'developer',
        });
        let resBody = { message: 'Token generated' };
        if (userData.payload.company_id) {
            resBody.isCompanyUser = true;
        }
        res
            .cookie('token', token)
            .status(200)
            .send(resBody);
    }),
};

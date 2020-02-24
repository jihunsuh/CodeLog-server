"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = require('express-async-handler');
const { userService } = require('../../services');
module.exports = {
    post: asyncHandler(async (req, res) => {
        const userData = req.body;
        const result = await userService.signup(userData);
        if (!result.success) {
            if (result.message === 'duplicated') {
                res.status(409).send('User already exists');
                return;
            }
            else {
                res.sendStatus(500);
                return;
            }
        }
        res.status(200).send('User successfully created!');
    }),
};

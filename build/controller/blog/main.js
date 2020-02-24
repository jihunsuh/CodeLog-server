"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = require('express-async-handler');
const { userService, postingService } = require('../../services');
module.exports = {
    get: asyncHandler(async (req, res) => {
        const { token } = req.cookies;
        const userResult = await userService.findByToken(token);
        if (!userResult.success) {
            res.status(403).send('login required');
            return;
        }
        let userData = userResult.payload;
        let blogPostDatas = await postingService.findBlog(userData.id);
        res.status(200).send(blogPostDatas.payload);
    }),
};

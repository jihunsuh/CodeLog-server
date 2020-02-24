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
        const postingResult = await postingService.findBlog(userData.id);
        if (!postingResult.success) {
            res.status(404).send(postingResult.message);
            return;
        }
        let post_count = 0;
        let tags = {};
        let themePosts;
        for (themePosts of Object.values(postingResult.payload)) {
            post_count += themePosts.length;
            themePosts.map((themePost) => {
                if (themePost.selected_tags.length !== 0) {
                    themePost.selected_tags.map((el) => {
                        tags[el] = 1;
                    });
                }
            });
        }
        tags = Object.keys(tags);
        userData.post_count = post_count;
        userData.tag_count = tags.length;
        userData.tags = tags;
        res.status(200).send(userData);
    }),
    put: asyncHandler(async (req, res) => {
        const userUpdateData = req.body;
        const { token } = req.cookies;
        const userResult = await userService.findByToken(token);
        if (!userResult.success) {
            res.status(403).send('login required');
            return;
        }
        let userData = userResult.payload;
        if (userUpdateData.email !== userData.email) {
            res.status(404).send("can't update email");
            return;
        }
        const userUpdateResult = await userService.update(userUpdateData);
        if (!userUpdateResult.success) {
            res.status(404).send(userUpdateResult.message);
            return;
        }
        res.status(200).send(userUpdateResult.payload);
    }),
};

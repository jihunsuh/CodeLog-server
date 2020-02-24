"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = require('express-async-handler');
const { postingService, userService } = require('../../services');
module.exports = {
    get: asyncHandler(async (req, res) => {
        const id = req.params.id;
        const { token } = req.cookies;
        const findresult = await postingService.find(id);
        if (!findresult.success) {
            res.status(404).send("i can't find your postings");
            return;
        }
        let postingInfo = findresult.payload;
        if (token) {
            const userResult = await userService.findByToken(token);
            if (!userResult.success) {
                res.status(403).send('login required');
                return;
            }
            const user_id = userResult.payload.id;
            postingInfo.isAuthor = postingInfo.user_id === user_id;
        }
        res.status(200).send(postingInfo);
    }),
    delete: asyncHandler(async (req, res) => {
        const id = req.params.id;
        const { token } = req.cookies;
        const userResult = await userService.findByToken(token);
        if (!userResult.success) {
            res.status(403).send('login required');
            return;
        }
        const user_id = userResult.payload.id;
        const postingInfo = await postingService.find(id);
        if (!postingInfo.success) {
            res.status(404).send("i can't find your postings");
            return;
        }
        if (postingInfo.payload.user_id !== user_id) {
            res.status(403).send('It is not your posting');
            return;
        }
        const deleteResult = await postingService.delete(id);
        if (!deleteResult.success) {
            res.status(404).send("There's an error while deleting your posting");
            return;
        }
        res.status(200).send('successfully deleted');
    }),
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = require('express-async-handler');
const { userService, postingService } = require('../../services');
module.exports = {
    post: asyncHandler(async (req, res) => {
        const { id } = req.body;
        const { token } = req.cookies;
        const userResult = await userService.findByToken(token);
        if (!userResult.success) {
            res.status(403).send('login required');
            return;
        }
        const user_id = userResult.payload.id;
        const findresult = await postingService.find(id);
        if (!findresult.success) {
            res.status(404).send("i can't find your postings");
            return;
        }
        if (findresult.payload.user_id === user_id) {
            res.status(403).send("You can't like yourself");
            return;
        }
        const likeResult = await postingService.like(id);
        if (!likeResult.success) {
            res.status(404).send("There's an error while liking");
            return;
        }
        res.status(200).send('successfully liked');
    }),
    delete: asyncHandler(async (req, res) => {
        const { id } = req.body;
        const { token } = req.cookies;
        const userResult = await userService.findByToken(token);
        if (!userResult.success) {
            res.status(403).send('login required');
            return;
        }
        const user_id = userResult.payload.id;
        const findresult = await postingService.find(id);
        if (!findresult.success) {
            res.status(404).send("i can't find your postings");
            return;
        }
        if (findresult.payload.user_id === user_id) {
            res.status(403).send("You can't like yourself");
            return;
        }
        const unlikeResult = await postingService.unlike(id);
        if (!unlikeResult.success) {
            res.status(404).send("There's an error while unliking");
            return;
        }
        res.status(200).send('successfully unliked');
    }),
};

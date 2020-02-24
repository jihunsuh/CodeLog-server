"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = require('express-async-handler');
const { userService, postingService } = require('../../services');
module.exports = {
    post: asyncHandler(async (req, res) => {
        const postingData = req.body;
        const { selected_tags } = postingData;
        const { token } = req.cookies;
        const userResult = await userService.findByToken(token);
        if (!userResult.success) {
            res.status(403).send('login required');
            return;
        }
        postingData.user_id = userResult.payload.id;
        const postResult = await postingService.create(postingData);
        if (!postResult.success) {
            res.status(404).send(postResult.message);
            return;
        }
        const { id } = postResult.payload;
        const tagResult = await postingService.addTags(id, selected_tags);
        if (!tagResult.success) {
            res.status(201).send({
                post_id: id,
                message: `it successfully created but can't put tags in"}`,
            });
        }
        res.status(201).send({
            post_id: id,
            message: `it successfully created!`,
        });
    }),
    get: asyncHandler(async (req, res) => {
        const { id } = req.body;
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
    put: asyncHandler(async (req, res) => {
        const postingData = req.body;
        const { token } = req.cookies;
        const userResult = await userService.findByToken(token);
        if (!userResult.success) {
            res.status(403).send('login required');
            return;
        }
        const user_id = userResult.payload.id;
        const updateResult = await postingService.update(user_id, postingData);
        if (!updateResult.success) {
            res.status(404).send(updateResult.message);
            return;
        }
        const { id, selected_tags } = postingData;
        const addTagResult = await postingService.addTags(id, selected_tags);
        if (!addTagResult.success) {
            res.status(404).send(addTagResult.message);
            return;
        }
        res.status(201).send('Posting successfully updated!');
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
            res.status(404).send(deleteResult.message);
            return;
        }
        res.status(200).send('successfully deleted');
    }),
    test: asyncHandler(async (req, res) => {
        const { id } = req.body;
        const postingInfo = await postingService.test(id);
        if (!postingInfo.success) {
            res.status(404).send("i can't find your postings");
            return;
        }
        res.status(200).send(postingInfo);
    }),
};

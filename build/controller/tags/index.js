"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = require('express-async-handler');
const { tags } = require('../../services/access');
module.exports = {
    get: asyncHandler(async (req, res) => {
        const getTagResult = await tags.getPTTags();
        if (!getTagResult) {
            res.status(404).send("There's an error while finding tags");
            return;
        }
        res.status(200).send({
            tags: getTagResult.map((el) => el.name),
        });
    }),
};

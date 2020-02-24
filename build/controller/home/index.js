"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = require('express-async-handler');
const { postingService } = require('../../services');
module.exports = {
    get: asyncHandler(async (req, res) => {
        const homeResult = await postingService.getHome();
        if (!homeResult.success) {
            res.status(404).send(homeResult.message);
            return;
        }
        res.status(200).send(homeResult.payload);
    }),
};

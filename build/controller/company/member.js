"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = require('express-async-handler');
const { userService, companyService } = require('../../services');
module.exports = {
    put: asyncHandler(async (req, res) => {
        const { token } = req.cookies;
        const userUpdateData = req.body;
        const userResult = await userService.findByToken(token);
        if (!userResult.success) {
            res.status(403).send('login required');
            return;
        }
        const findCompanyResult = await companyService.find(userResult.payload.company_id);
        if (!findCompanyResult.success) {
            res.status(404).send(`There's an error while finding your company`);
            return;
        }
        if (userResult.payload.company_id === findCompanyResult.payload.id) {
            const userUpdateResult = await userService.updatebyId(userUpdateData);
            if (!userUpdateResult.success) {
                res.status(404).send(userUpdateResult.message);
                return;
            }
        }
        else {
            res.status(404).send('it is not your company');
            return;
        }
        res.status(200).send('Member successfully updated');
    }),
    delete: asyncHandler(async (req, res) => {
        const { token } = req.cookies;
        const { user_id } = req.body;
        const userResult = await userService.findByToken(token);
        if (!userResult.success) {
            res.status(403).send('login required');
            return;
        }
        const findCompanyResult = await companyService.find(userResult.payload.company_id);
        if (!findCompanyResult.success) {
            res.status(404).send(`There's an error while finding your company`);
            return;
        }
        if (userResult.payload.company_id === findCompanyResult.payload.id) {
            const userDeleteResult = await userService.delete(user_id);
            if (!userDeleteResult.success) {
                res.status(404).send(userDeleteResult.message);
                return;
            }
        }
        else {
            res.status(404).send('it is not your company');
            return;
        }
        res.status(200).send('Member successfully deleted');
    }),
};

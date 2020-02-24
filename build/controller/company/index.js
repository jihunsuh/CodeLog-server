"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = require('express-async-handler');
const { userService, companyService } = require('../../services');
module.exports = {
    get: asyncHandler(async (req, res) => {
        const { token } = req.cookies;
        const userData = await userService.findByToken(token);
        const findCompanyResult = await companyService.find(userData.payload.company_id);
        if (!findCompanyResult.success) {
            res.status(404).send(`There's an error while finding your company`);
            return;
        }
        let companyData = findCompanyResult.payload;
        companyData.Users = companyData.Users.map((user) => {
            if (user.id === userData.payload.id) {
                user.dataValues.isUser = true;
            }
            return user;
        });
        const developerDatas = await companyService.findDeveloper(companyData.id);
        if (!developerDatas.success) {
            res.status(404).send(`There's an error while finding developers`);
            return;
        }
        companyData.recommended_developers = developerDatas.payload;
        res.status(200).send(companyData);
    }),
    put: asyncHandler(async (req, res) => {
        const companyUpdateData = req.body;
        const { company_tags } = companyUpdateData;
        const { token } = req.cookies;
        const userResult = await userService.findByToken(token);
        if (!userResult.success) {
            res.status(403).send('login required');
            return;
        }
        if (userResult.payload.company_id !== companyUpdateData.id) {
            res.status(403).send("you're not company user");
            return;
        }
        const companyUpdateResult = await companyService.update(companyUpdateData);
        if (!companyUpdateResult.success) {
            res.status(404).send(companyUpdateResult.message);
            return;
        }
        const company_id = companyUpdateData.id;
        const updateTagResult = await companyService.addTags(company_id, company_tags);
        if (!updateTagResult.success) {
            res.status(404).send(updateTagResult.message);
            return;
        }
        res.status(200).send('Company successfully updated');
    }),
    member: require('./member'),
    memberbyid: require('./memberbyid'),
};

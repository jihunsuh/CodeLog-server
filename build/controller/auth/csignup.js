"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = require('express-async-handler');
const { companyService } = require('../../services');
module.exports = {
    post: asyncHandler(async (req, res) => {
        const companyData = req.body;
        const SigninResult = await companyService.signup(companyData);
        if (!SigninResult.success) {
            res.status(409).send(SigninResult.message);
            return;
        }
        const company_id = SigninResult.payload.id;
        res.status(200).send({
            company_id,
            message: 'Company successfully created!',
        });
    }),
};

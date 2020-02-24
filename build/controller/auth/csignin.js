"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = require('express-async-handler');
const { tokenGenerator } = require('../../utils/token');
const { companyService } = require('../../services');
module.exports = {
    post: asyncHandler(async (req, res) => {
        const { company_code, email, username, password } = req.body;
        const emailOrUsername = email || username;
        const signinResult = await companyService.signin(company_code, emailOrUsername, password);
        if (!signinResult.success) {
            res.status(404).send(signinResult.message);
            return;
        }
        const token = await tokenGenerator({
            email: signinResult.payload.email,
            password: signinResult.payload.password,
            user_type: 'company',
        });
        res
            .cookie('token', token)
            .status(200)
            .send({
            message: 'Token generated',
        });
    }),
};

const asyncHandler = require('express-async-handler');

import { Request, Response } from 'express';
import { users } from '../../services';

interface Result {
  success: boolean;
  payload: any;
  message: string;
}

interface body {
  email: string;
  username: string;
  password: string;
  companyid: string;
  rank: string;
  completion: string;
  website: string;
}

module.exports = {
  post: asyncHandler(async (req: Request, res: Response) => {
    const { email, username, password, companyid, rank, completion, website } = req.body as body;

    let result: Result = await users.create(
      email,
      username,
      password,
      companyid,
      rank,
      completion,
      website,
    );
    if (!result.success) {
      if (result.message === 'duplicated') {
        res.status(409).send('User already exists');
      } else {
        res.sendStatus(500);
      }
    }

    res.status(200).send('User successfully created!');
  }),
};

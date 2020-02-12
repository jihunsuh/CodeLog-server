const asyncHandler = require('express-async-handler');

import { Request, Response } from 'express';
const { isValid } = require('../../utils/token');
const { postings, tags } = require('../../services');

interface Decode {
  isValid: boolean;
  token: string | undefined;
  userData: {
    id: string;
  };
}

interface Result {
  success: boolean;
  payload: any;
  message: string;
}

module.exports = {
  get: asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.cookies;

    let decodeData: Decode = await isValid(token);
    if (!decodeData.isValid) {
      res.status(403).send('login required');
      return;
    }
    const userid: string = decodeData.userData.id;

    let posts: Object = {};
    const findresult: Result = await postings.findTIL(userid);
    if (!findresult.success) {
      res.status(404).send(`There's an error while finding your posts`);
      return;
    }
    console.log(findresult.payload);
    posts['posts'] = findresult.payload;

    res.status(200).send(posts);
  }),
};

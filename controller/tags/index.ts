const asyncHandler = require('express-async-handler');

import { Request, Response } from 'express';
const { tags } = require('../../services');

interface Result {
  success: boolean;
  payload: any;
  message: string;
}

module.exports = {
  get: asyncHandler(async (req: Request, res: Response) => {
    const getTagResult: Result = await tags.getAllTags();
    if (!getTagResult.success) {
      res.status(404).send("There's an error while finding tags");
      return;
    }
    res.status(200).send(getTagResult.payload);
  }),
};

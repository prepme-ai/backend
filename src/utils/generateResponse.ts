import { Response } from 'express';
import { CreateResponseI } from './service.helpers';

export const generateResponse = (res: Response, responseObj: CreateResponseI) => {
  return res.status(responseObj.statusCode).json({
    ...responseObj,
  });
};

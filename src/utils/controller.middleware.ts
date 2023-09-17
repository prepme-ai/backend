import { Request, Response } from 'express';
import { CreateResponseI, createResponse } from './service.helpers';
import { generateResponse } from './generateResponse';
import { HttpStatusCode } from 'axios';

/**
 * @param {any} params
 * @param {function} callback
 * @returns {function} callback
 * @description This function is used to resolve the controller functions
 */
function resolveController(params: any, callback: any, req: Request, res: Response) {
  return (function () {
    callback(params)
      .then((responseObj: CreateResponseI) => {
        generateResponse(res, responseObj);
      })
      .catch((error: any) => {
        console.log(error);
        generateResponse(
          res,
          createResponse({
            message: 'Server Internal Error!',
            statusCode: HttpStatusCode.InternalServerError,
          }),
        );
      });
  })();
}

export default resolveController;

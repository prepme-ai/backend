import { Request, Response } from "express";

/**
 * @param {any} params
 * @param {function} callback
 * @returns {function} callback
 * @description This function is used to resolve the controller functions
 */
function resolveController (params:any, callback:any) {
    return function (req:Request, res:Response) {
        callback(params)
            .then((result:any) => {
                res.status(result.status).json({ ...result });
            })
            .catch((error:any) => {
                console.log(error);
                res.status(500).json({ message: 'Server Internal Error!' });
            });
    };
};

export default resolveController;
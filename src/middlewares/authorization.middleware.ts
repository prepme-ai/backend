import { NextFunction, Request, Response } from "express";
import { getAuth } from "../utils/firebase.helpers";
import { generateResponse } from "../utils/generateResponse";
import { createResponse } from "../utils/service.helpers";
import { AuthLocales } from "../locales/auth.locales";
import { HttpStatusCode } from "axios";

export const authorizeUser = (req:Request, res:Response, next:NextFunction) => {
    const auth = getAuth();
    const token = req.headers.authorization?.split(' ')[1];
    
    if(!token){
        console.log(token);
        return generateResponse(res, createResponse({
            message: AuthLocales.NOT_AUTHORIZED,
            statusCode: HttpStatusCode.Unauthorized
        }))
    }
    try {
        const user = auth.verifyIdToken(token);
        // TODO: handle this nasty type thing

        //@ts-ignore
        req.user = user;
        return next();
    } catch (error) {
        // TODO: Handle diffferent outputs verify Id token
        return generateResponse(res, createResponse({
            message: AuthLocales.NOT_AUTHORIZED,
            statusCode: HttpStatusCode.BadRequest
        }))
    }
};

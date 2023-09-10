
import { NextFunction, Request, Response } from "express";
import Joi from "joi"
import { createResponse } from "../utils/service.helpers";
import { HttpStatusCode } from "axios";
import { AppLocales } from "../locales/app.locales";
import { generateResponse } from "../utils/generateResponse";

const registerUserSchema = Joi.object({
    fullName: Joi.string()
        .min(3)
        .max(65)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    
    phoneNumber: Joi.string()
        .required(),
        // Parse country code and test regex
        // .pattern(new RegExp("^[0-9]*$")),

    userType: Joi.string()
        .required(),

})

export const registerUserMiddleware = (req:Request, res:Response, next:NextFunction) => {
    const body = req.body;
    const validatation = registerUserSchema.validate(body);

    if (validatation.error){
        const responseObj = createResponse({
            message: AppLocales.BODY_NOT_VALIDATED,
            statusCode: HttpStatusCode.BadRequest,
            data: validatation.error
        });
       return generateResponse(res, responseObj);
    }
    console.log(AppLocales.BODY_VALIDATED);

    return next();
}
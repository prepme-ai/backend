import { Request, Response } from "express";
import * as UserService from "../services/user.service";
import resolveController from "../utils/controller.middleware";

export const postRegister = (req: Request, res: Response) => {
  const { fullName, email, phoneNumber, password, userType } = req.body;
  console.log(req.body);
  const func = resolveController(
    {
      fullName,
      email,
      phoneNumber,
      password,
      userType,
    },
    UserService.registerUser
  );
  func(req, res);
};

export const getUserDetails = (req: Request, res: Response) => {
  const { uid } = req.params;
  const func = resolveController({ uid }, UserService.getUserDetails);
  func(req, res);
};
export const refreshToken = (req: Request, res: Response) => {
  const { uid } = req.params;
  const func = resolveController({ uid }, UserService.refreshToken);
  func(req, res);
};

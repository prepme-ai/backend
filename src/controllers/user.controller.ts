import { Request, Response } from 'express';
import * as UserService from '../services/user.service';
import resolveController from '../utils/controller.middleware';

export const postLogin = (req: Request, res: Response) => {
  const { email, password } = req.body;
  resolveController(
    {
      email,
      password,
    },
    UserService.loginUser,
    req,
    res,
  );
};

export const postRegister = (req: Request, res: Response) => {
  const { fullName, email, phoneNumber, password, userType } = req.body;
  resolveController(
    {
      //!!!!!! fullName will change to name, surname
      fullName,
      email,
      phoneNumber,
      password,
      userType,
    },
    UserService.registerUser,
    req,
    res,
  );
};

export const getUserDetails = (req: Request, res: Response) => {
  const { uid } = req.params;
  resolveController({ uid }, UserService.getUserDetails, req, res);
};
export const refreshToken = (req: Request, res: Response) => {
  const { uid } = req.params;
  resolveController({ uid }, UserService.refreshToken, req, res);
};

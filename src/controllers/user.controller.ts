import * as UserService from "../services/user.service";
import resolveController from "../utils/controller.middleware";

export const postRegister = (req: any, res: any) => {
  const { fullName, email, phoneNumber, password, userType } = req.body;
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

export const getUserDetails = (req: any, res: any) => {
  const { uid } = req.params;
  const func = resolveController({ uid }, UserService.getUserDetails);
  func(req, res);
};
export const refreshToken = (req: any, res: any) => {
  const { uid } = req.params;
  const func = resolveController({ uid }, UserService.refreshToken);
  func(req, res);
};

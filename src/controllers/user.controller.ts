import { Request, Response } from "express";
import resolveController from "../utils/controller.middleware";
import UserService from "../services/user.service";

class UserController {
    constructor(
        private userService: UserService = new UserService()
    ) {
       this.userService = new UserService();
    }
    public static async postRegister(req: Request, res: Response) {
            const { fullName, email, phoneNumber, password, city, country, address, lat, lng, userType } =
                req.body;
            const func = resolveController(
                {
                    fullName,
                    email,
                    phoneNumber,
                    password,
                    city,
                    country,
                    address,
                    lat,
                    lng,
                    userType,
                },
                this.userService.postRegister
            );
            func(req, res);
    }
}

export default UserController;

import { Router } from "express";
import UserController from "../controllers/user.controller";

const router = Router();
const userController = new UserController() as any;

router.post('/register', userController.postRegister);

export default router;

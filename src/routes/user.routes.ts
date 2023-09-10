import { Router } from "express";
import {
  postRegister,
  getUserDetails,
  refreshToken,
  postLogin,
} from "../controllers/user.controller";
import { registerUserMiddleware } from "../middlewares/user.middlewares";

const router = Router();

router
  .get("/:uid", getUserDetails)
  .post("/", registerUserMiddleware, postRegister)
  
router.post("/login", postLogin);
router.get("/refreshToken/:uid", refreshToken);

export default router;

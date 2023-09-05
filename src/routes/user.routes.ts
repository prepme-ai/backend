import { Router } from "express";
import {
  postRegister,
  getUserDetails,
  refreshToken,
  postLogin,
} from "../controllers/user.controller";

const router = Router();

router
  .get("/details/:uid", getUserDetails)
  .post("/", postRegister)
router.post("/login", postLogin);
router.get("/refreshToken/:uid", refreshToken);

export default router;

import { Router } from "express";
import {
  postRegister,
  getUserDetails,
  refreshToken,
} from "../controllers/user.controller";

const router = Router();

router
  .get("/details/:uid", getUserDetails)
  .post("/", postRegister)

router.get("/refreshToken/:uid", refreshToken);

export default router;

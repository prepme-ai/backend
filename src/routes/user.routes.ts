import { Router } from "express";
import {
  postRegister,
  getUserDetails,
  refreshToken,
} from "../controllers/user.controller";

const router = Router();

router.post("/register", postRegister);
router.get("/details/:uid", getUserDetails);
router.get("/refreshToken/:uid", refreshToken);

export default router;

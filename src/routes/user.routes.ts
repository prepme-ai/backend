import { Router } from "express";
import {
  postRegister,
  getUserDetails,
  refreshToken,
} from "../controllers/user.controller";

const router = Router();

router.post("/", postRegister).get("/details/:uid", getUserDetails);
router.get("/refreshToken/:uid", refreshToken);

export default router;

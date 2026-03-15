import { signup, login, getUser } from "../controllers/user.controller.js";
import { Router } from "express";

const router = Router();
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/getUser").get(getUser);

export default router;

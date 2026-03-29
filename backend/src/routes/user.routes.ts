import { signup, login, getUser, getBookingHistory } from "../controllers/user.controller.js";
import { Router } from "express";

const router = Router();
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/:id").get(getUser);
router.route("/:id/bookings").get(getBookingHistory);

export default router;

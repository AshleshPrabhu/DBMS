import { Router } from "express";
import { createBooking, getShowDetailsByMovieName } from "../controllers/booking.controller.js";

const router = Router();
router.route("/").post(createBooking);
router.route("/shows/:movieName").get(getShowDetailsByMovieName);

export default router;
import { Router } from "express";
import { createBooking, getShowDetailsByMovieName } from "../controllers/booking.controller.js";
import { getShowsByMovieAndDate } from "../controllers/shows.controller.js";

const router = Router();
router.route("/").post(createBooking);
router.route("/shows/:movieName").get(getShowDetailsByMovieName);
router.get("/:movieName/:date", getShowsByMovieAndDate);
export default router;
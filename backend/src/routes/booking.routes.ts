import { Router } from "express";
import { getShowDetailsByMovieName } from "../controllers/booking.controller.js";

const router = Router();
router.route("/shows/:movieName").get(getShowDetailsByMovieName);

export default router;
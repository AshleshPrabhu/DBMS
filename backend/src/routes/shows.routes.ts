import { Router } from "express";

import { createShow, getShowDetails, getShowsByMovieAndDate } from "../controllers/shows.controller.js";

const router = Router();
router.post("/create", createShow);
router.get("/:showId", getShowDetails);
router.get("/:movieName/:date", getShowsByMovieAndDate);

export default router;
import { Router } from "express";
import { createMovie, getAllMovies, getMovieByName } from "../controllers/movie.controller.js";
const router = Router();

router.route("/").get(getAllMovies);
router.route("/create").post(createMovie);
router.route("/:name").get(getMovieByName);

export default router;
import { Router } from "express";
import { createMovie } from "../controllers/movie.controller.js";
const router = Router();

router.post("/create", createMovie);
export default router;
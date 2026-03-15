import {Router} from "express";
import { createTheater, getTheaters, getTheaterById } from "../controllers/theater.controller.js";

const router = Router();
router.route("/create").post(createTheater);
router.route("/").get(getTheaters);
router.route("/:id").get(getTheaterById);

export default router;
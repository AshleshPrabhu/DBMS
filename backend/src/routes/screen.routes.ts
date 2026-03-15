import { Router } from "express";
import { createScreen, getScreensByTheater } from "../controllers/screen.controller.js";

const router = Router();
router.route("/create").post(createScreen);
router.route("/:theaterId").get(getScreensByTheater);

export default router;
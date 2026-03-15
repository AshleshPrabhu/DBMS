import { Router } from "express";
import { createLocation } from "../controllers/location.controller.js";

const router = Router();

router.route("/create").post(createLocation);

export default router;
import { Router } from "express";
import { createLocation } from "../controllers/location.controller.js";

const router = Router();

router.post("/create", createLocation);

export default router;
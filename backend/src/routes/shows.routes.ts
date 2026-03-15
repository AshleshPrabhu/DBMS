import { Router } from "express";

import { createShow } from "../controllers/shows.controller.js";

const router = Router();
router.post("/create", createShow);
export default router;
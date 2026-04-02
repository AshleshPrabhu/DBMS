import { Router } from "express";
import { getAllSnacks } from "../controllers/snacks.controller.js";

const router = Router();

router.get("/", getAllSnacks);

export default router;

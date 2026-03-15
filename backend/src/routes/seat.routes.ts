import { Router } from "express";
import { createSeats, getSeatsByScreenId, getSeatsForTheater } from "../controllers/seat.controller.js";

const router = Router();

router.post("/create", createSeats);
router.get("/screen/:id", getSeatsByScreenId);
router.get("/theater/:theaterId", getSeatsForTheater);

export default router;
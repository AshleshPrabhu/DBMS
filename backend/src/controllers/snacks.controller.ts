import type { Request, Response } from "express";
import { db } from "../config/db.js";

export const getAllSnacks = async (req: Request, res: Response) => {
    try {
        const [rows] = await db.execute("SELECT * FROM snacks");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

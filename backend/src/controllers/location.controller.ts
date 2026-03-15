import type { Request, Response } from "express";
import { db } from "../config/db.js";

export async function createLocation(req: Request, res: Response) {
    try {
        const { city, state, pincode, name } = req.body;
        const [result]:any = await db.query(
            "INSERT INTO locations (city, state, pincode, name) VALUES (?, ?, ?, ?)",
            [city, state, pincode, name]
        );
        return res.status(201).json({ id: result.insertId, city, state, pincode, name });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error while creating location" });
    }
}

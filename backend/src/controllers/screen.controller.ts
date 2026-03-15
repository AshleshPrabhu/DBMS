import type { Request, Response } from "express";
import { db } from "../config/db.js";

export const createScreen = async (req: Request, res: Response) => {
    try {
        const { name, theaterId } = req.body;
        if(!name || !theaterId) {
            return res.status(400).json({ message: "Missing required fields: name and theaterId" });
        }
        const [result]: any = await db.execute(
            "INSERT INTO screen (name, theater_id) VALUES (?, ?)",
            [name, theaterId]
        );
        const screenId = result.insertId;
        return res.status(201).json({ message: "Screen created successfully", screenId })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error while creating screen" });
    }
}

export const getScreensByTheater = async (req: Request, res: Response) => {
    try {
        const { theaterId } = req.params;
        if(!theaterId) {
            return res.status(400).json({ message: "Missing required parameter: theaterId" });
        }
        const [screens]: any = await db.execute(
            "SELECT * FROM screen WHERE theater_id = ?",
            [theaterId]
        )
        if(screens.length === 0) {
            return res.status(404).json({ message: "No screens found for the specified theater" });
        }
        return res.status(200).json({ screens });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error while fetching screens" });
    }
}



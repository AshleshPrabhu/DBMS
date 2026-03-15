import type { Request, Response } from "express";
import { db } from "../config/db.js";

export async function createTheater(req: Request, res: Response) {
    try {
        const { name, location } = req.body;
        if(!name || !location) {
            return res.status(400).json({ message: "Name and location are required" });
        }
        const [result]: any = await db.execute(
            "INSERT INTO theater (name, location) VALUES (?, ?)",
            [name, location]
        );
        return res.status(201).json({ id: result.insertId, name, location })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
}

export async function getTheaters(req: Request, res: Response) {
    try {
        const [theaters]: any = await db.execute("SELECT * FROM theater");
        return res.status(200).json(theaters);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
}

export async function getTheaterById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        if(!id){
            return res.status(400).json({ message: "Theater ID is required" });
        }
        const [theater]: any = await db.execute("SELECT * FROM theater WHERE id = ?", [id]);
        if (theater.length === 0) {
            return res.status(404).json({ message: "Theater not found" });
        }
        return res.status(200).json(theater[0]);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
        
    }
}
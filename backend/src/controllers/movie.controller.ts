import type { Request, Response } from "express";
import { db } from "../config/db.js";

export async function createMovie(req: Request, res: Response) {
    try {
        const { name, image, about, reviews, actors } = req.body;
        if(!name){
            return res.status(400).json({ message: "Movie name is required" });
        }
        const [result]: any = await db.execute(
            "INSERT INTO movies (name, image, about, reviews, actors) VALUES (?, ?, ?, ?, ?)",
            [name, image, about, reviews, actors]
        );
        return res.status(201).json({ id: result.insertId, name, image, about, reviews, actors })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
}
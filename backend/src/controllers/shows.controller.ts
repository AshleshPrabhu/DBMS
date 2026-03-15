import type { Request, Response } from "express";
import { db } from "../config/db.js";

export async function createShow(req: Request, res: Response) {
    try {
        const { movie_id, screen_id, movie_time } = req.body;
        if(!movie_id || !screen_id || !movie_time) {
            return res.status(400).json({ message: "Movie ID, Screen ID and Movie Time are required" });
        }
        const [result]: any = await db.execute(
            "INSERT INTO shows (movie_id, screen_id, movie_time) VALUES (?, ?, ?)",
            [movie_id, screen_id, movie_time]
        );
        return res.status(201).json({ id: result.insertId, movie_id, screen_id, movie_time })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error while creating shows", error });
    }
}
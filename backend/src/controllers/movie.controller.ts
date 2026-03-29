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

export async function getAllMovies(req: Request, res: Response) {
    try {
        const [movies] = await db.query("SELECT * FROM movies");
        return res.status(200).json(movies);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
}

export async function getMovieByName(req: Request, res: Response) {
    try {
        const { name } = req.params;
        if (!name) {
            return res.status(400).json({ message: "Movie name is required" });
        }
        const [rows]: any = await db.execute(
            "SELECT * FROM movies WHERE name = ?",
            [name]
        );
        if (rows.length === 0) {
            return res.status(404).json({ message: "Movie not found" });
        }
        return res.status(200).json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
}
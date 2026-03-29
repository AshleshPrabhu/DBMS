import type { Request, Response } from "express";
import { db } from "../config/db.js";

export async function getShowDetailsByMovieName(req: Request, res: Response) {
    try {
        const { movieName } = req.params;

        if (!movieName) {
            return res.status(400).json({ message: "Movie name is required" });
        }

        const [shows]: any = await db.execute(
            `SELECT 
                s.id as show_id, 
                s.movie_time, 
                t.name as theater_name, 
                sc.name as screen_name,
                sc.id as screen_id
            FROM shows s
            JOIN movies m ON s.movie_id = m.id
            JOIN screen sc ON s.screen_id = sc.id
            JOIN theater t ON sc.theater_id = t.id
            WHERE m.name = ?`,
            [movieName]
        );

        if (shows.length === 0) {
            return res.status(404).json({ message: "No shows found for this movie" });
        }

        const showDetails = [];

        for (const show of shows) {
            const [seats]: any = await db.execute(
                `SELECT id, seat_number, amount FROM seat WHERE screen_id = ?`,
                [show.screen_id]
            );

            const [bookedSeats]: any = await db.execute(
                `SELECT seat_id FROM booking_seat WHERE show_id = ?`,
                [show.show_id]
            );

            const bookedSeatIds = bookedSeats.map((s: any) => s.seat_id);

            showDetails.push({
                ...show,
                seats,
                bookedSeatIds
            });
        }

        return res.json(showDetails);

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
}
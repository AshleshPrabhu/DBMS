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

export async function getShowDetails(req: Request, res: Response) {
    try {
        const { showId } = req.params;

        if (!showId) {
            return res.status(400).json({ message: "Show ID is required" });
        }

        const [shows]: any = await db.execute(
            `SELECT 
                s.id as show_id, 
                s.movie_time, 
                t.name as theater_name, 
                sc.name as screen_name,
                sc.id as screen_id,
                m.name as movie_name,
                m.language,
                m.format
            FROM shows s
            JOIN movies m ON s.movie_id = m.id
            JOIN screen sc ON s.screen_id = sc.id
            JOIN theater t ON sc.theater_id = t.id
            WHERE s.id = ?`,
            [showId]
        );

        if (shows.length === 0) {
            return res.status(404).json({ message: "No show found" });
        }

        const show = shows[0];

        const [seats]: any = await db.execute(
            `SELECT id, seat_number, amount FROM seat WHERE screen_id = ? ORDER BY seat_number ASC`,
            [show.screen_id]
        );

        const [bookedSeats]: any = await db.execute(
            `SELECT DISTINCT seat_id FROM booking_seat WHERE show_id = ?`,
            [show.show_id]
        );

        const bookedSeatIds = bookedSeats.map((s: any) => s.seat_id);

        const showDetails = {
            ...show,
            seats,
            bookedSeatIds
        };

        return res.json(showDetails);

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
}

export async function getShowsByMovieAndDate(req: Request, res: Response) {
    try {
        const { movieName, date } = req.params;

        if (!movieName || !date) {
            return res.status(400).json({ message: "Movie name and date are required" });
        }

        const startDate = `${date} 00:00:00`;
        const endDate = `${date} 23:59:59`;

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
            WHERE m.name = ? AND s.movie_time BETWEEN ? AND ?`,
            [movieName, startDate, endDate]
        );

        if (shows.length === 0) {
            return res.json([]);
        }

        const showDetails = [];

        for (const show of shows) {
            const [seats]: any = await db.execute(
                `SELECT id, seat_number, amount FROM seat WHERE screen_id = ? ORDER BY seat_number ASC`,
                [show.screen_id]
            );

            const [bookedSeats]: any = await db.execute(
                `SELECT DISTINCT seat_id FROM booking_seat WHERE show_id = ?`,
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
        console.error(error);
        return res.status(500).json({
            message: "Internal server error while fetching shows by date",
            error
        });
    }
}
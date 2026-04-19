import type { Request, Response } from "express";
import { db } from "../config/db.js";

export const createBooking = async (req: Request, res: Response) => {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();
        const { show_id, seat_ids, snacks, user_id, razorpay_order_id } = req.body;

        if (!show_id || !seat_ids || !user_id) {
            return res.status(400).json({ message: "show_id, seat_ids and user_id are required" });
        }

        const [existingBookings]: any = await connection.execute(
            `SELECT seat_id FROM booking_seat WHERE show_id = ? AND seat_id IN (?)`,
            [show_id, seat_ids]
        );

        if (existingBookings.length > 0) {
            const bookedSeatIds = existingBookings.map((b: any) => b.seat_id);
            return res.status(409).json({ message: `Seats ${bookedSeatIds.join(', ')} are already booked.` });
        }

        const [bookingResult]: any = await connection.execute(
            `INSERT INTO booking (user_id, show_id, razorpay_order_id) VALUES (?, ?, ?)`,
            [user_id, show_id, razorpay_order_id]
        );
        const booking_id = bookingResult.insertId;

        for (const seat_id of seat_ids) {
            await connection.execute(
                `INSERT INTO booking_seat (booking_id, show_id, seat_id) VALUES (?, ?, ?)`,
                [booking_id, show_id, seat_id]
            );
        }

        if (snacks && snacks.length > 0) {
            for (const snack of snacks) {
                await connection.execute(
                    `INSERT INTO booking_snack (booking_id, snack_id, quantity) VALUES (?, ?, ?)`,
                    [booking_id, snack.id, snack.quantity]
                );
            }
        }

        await connection.commit();
        res.status(201).json({ message: "Booking created successfully", booking_id });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ message: "Server error" });
    } finally {
        connection.release();
    }
};

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
        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
}
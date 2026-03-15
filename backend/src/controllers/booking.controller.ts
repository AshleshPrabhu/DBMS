import type { Request, Response } from "express";
import { db } from "../config/db.js";

export async function createBooking(req: Request, res: Response) {

    const connection = await db.getConnection();

    try {
        const { user_id, show_id, seats } = req.body;

        if (!user_id || !show_id || !seats?.length) {
            return res.status(400).json({
                message: "User ID, Show ID and seats are required"
            });
        }

        await connection.beginTransaction();

        const [existing]: any = await connection.query(
            `SELECT bs.seat_id
            FROM booking_seat bs
            JOIN booking b ON b.id = bs.booking_id
            WHERE b.show_id = ?
            AND bs.seat_id IN (?)`,
            [show_id, seats]
        );

        if (existing.length > 0) {
            await connection.rollback();

            return res.status(400).json({
                message: "Seats already booked",
                bookedSeats: existing.map((s: any) => s.seat_id)
            });
        }

        const [result]: any = await connection.execute(
            `INSERT INTO booking (user_id, show_id)
            VALUES (?, ?)`,
            [user_id, show_id]
        );

        const bookingId = result.insertId;

        for (const seat of seats) {
            await connection.execute(
                `INSERT INTO booking_seat (booking_id, show_id, seat_id)
                VALUES (?, ?, ?)`,
                [bookingId, show_id, seat]
            );
        }

        await connection.commit();

        return res.status(201).json({
            booking_id: bookingId,
            user_id,
            show_id,
            seats
        });

    } catch (error) {

        await connection.rollback();

        return res.status(500).json({
            message: "Internal server error",
            error
        });

    } finally {
        connection.release();
    }
}
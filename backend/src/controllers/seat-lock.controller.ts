import type{ Request, Response } from 'express';
import { db } from '../config/db.js';

const LOCK_DURATION_MINUTES = 2;

export const lockSeats = async (req: Request, res: Response) => {
    const { show_id, seat_ids, user_id } = req.body;

    if (!show_id || !seat_ids || !user_id || !Array.isArray(seat_ids) || seat_ids.length === 0) {
        return res.status(400).json({ message: 'Invalid request body' });
    }

    const now = new Date();
    const expires_at = new Date(now.getTime() + LOCK_DURATION_MINUTES * 60 * 1000);
    
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        const [bookedSeats]: any = await connection.query(
            'SELECT seat_id FROM booking_seat WHERE show_id = ? AND seat_id IN (?)',
            [show_id, seat_ids]
        );

        if (bookedSeats.length > 0) {
            await connection.rollback();
            const bookedSeatIds = bookedSeats.map((s: any) => s.seat_id);
            return res.status(409).json({ message: `Seats already booked: ${bookedSeatIds.join(', ')}` });
        }

        const [lockedSeats]: any = await connection.query(
            'SELECT seat_id FROM seat_lock WHERE show_id = ? AND seat_id IN (?) AND expires_at > NOW()',
            [show_id, seat_ids]
        );

        if (lockedSeats.length > 0) {
            await connection.rollback();
            const lockedSeatIds = lockedSeats.map((s: any) => s.seat_id);
            return res.status(409).json({ message: `Seats already locked: ${lockedSeatIds.join(', ')}` });
        }

        const lockValues = seat_ids.map((seat_id: number) => [show_id, seat_id, user_id, now, expires_at]);
        await connection.query(
            'INSERT INTO seat_lock (show_id, seat_id, user_id, locked_at, expires_at) VALUES ?',
            [lockValues]
        );

        await connection.commit();

        res.status(200).json({ message: 'Seats locked successfully', expires_at });
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        connection.release();
    }
};

export const getLockedSeats = async (req: Request, res: Response) => {
    const { show_id } = req.params;

    try {
        await db.query('DELETE FROM seat_lock WHERE expires_at < NOW()');

        const [lockedSeats]: any = await db.query(
            'SELECT seat_id FROM seat_lock WHERE show_id = ?',
            [show_id]
        );
        const lockedSeatIds = lockedSeats.map((s: any) => s.seat_id);
        res.status(200).json(lockedSeatIds);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

import type { Request, Response } from "express";
import { db } from "../config/db.js";
import bcrypt from "bcryptjs";

export async function signup(req: Request, res: Response) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
        return res.status(400).json({
            message: "Name and Email and password are required",
        });
        }

        const [rows] = await db.execute(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if ((rows as any[]).length > 0) {
            return res.status(409).json({
                message: "Email already in use",
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const [result]: any = await db.execute(
            "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
            [name, email, hash]
        );

        return res.status(201).json({
            id: result.insertId,
            name,
            email,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error while creating user",
        });
    }
}

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        
        const [rows]: any = await db.execute(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );
        console.log(rows);
        if (!rows.length) return res.status(401).json({ message: "Invalid" });
        
        const user = rows[0];
        const match = await bcrypt.compare(password, user.password_hash);
        console.log("Password match:", match);
        if (!match) return res.status(401).json({ message: "Invalid credentials" });

        const { password_hash, ...userResponse } = user;
        
        res.json({ message: "Login success", user: userResponse });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error while logging in",
        });
    }
}

export async function getUser(req: Request, res: Response) {
    try {
        const userId = req.params.id;
        if(!userId) return res.status(400).json({ message: "User ID is required" });
        const [rows]: any = await db.execute(
            "SELECT id, name, email FROM users WHERE id = ?",
            [userId]
        );
        if (!rows.length) return res.status(404).json({ message: "User not found" });
        res.json(rows[0]);
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error while fetching user",
        });
    }
}

export async function getBookingHistory(req: Request, res: Response) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const [bookings]: any = await db.execute(
            `SELECT 
                b.id as booking_id,
                b.created_at,
                m.name as movie_name,
                m.image as movie_image,
                s.movie_time,
                t.name as theater_name
            FROM booking b
            JOIN shows s ON b.show_id = s.id
            JOIN movies m ON s.movie_id = m.id
            JOIN screen sc ON s.screen_id = sc.id
            JOIN theater t ON sc.theater_id = t.id
            WHERE b.user_id = ?
            ORDER BY b.created_at DESC`,
            [id]
        );

        if (bookings.length === 0) {
            return res.status(200).json([]);
        }

        const bookingHistory = [];
        for (const booking of bookings) {
            const [seats]: any = await db.execute(
                `SELECT st.seat_number, st.amount 
                 FROM booking_seat bs
                 JOIN seat st ON bs.seat_id = st.id
                 WHERE bs.booking_id = ?`,
                [booking.booking_id]
            );

            const [snacks]: any = await db.execute(
                `SELECT s.name, s.price, bs.quantity 
                 FROM booking_snack bs
                 JOIN snacks s ON bs.snack_id = s.id
                 WHERE bs.booking_id = ?`,
                [booking.booking_id]
            );

            bookingHistory.push({
                ...booking,
                seats,
                snacks
            });
        }

        res.json(bookingHistory);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error while fetching booking history",
        });
    }
}
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
        
        if (!rows.length) return res.status(401).json({ message: "Invalid" });
        
        const user = rows[0];
        const match = await bcrypt.compare(password, user.password_hash);
        
        if (!match) return res.status(401).json({ message: "Invalid" });
        
        res.json({ message: "Login success", userId: user.id });
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
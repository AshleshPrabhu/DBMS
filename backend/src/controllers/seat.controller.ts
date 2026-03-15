import type { Request, Response } from "express";
import { db } from "../config/db.js";
interface Seat {
    id: number;
    seatArr:[{
        seat_number:number;
        amount:number;
    }]
}
export const createSeats = async (req: Request, res: Response) => {
    try {
        const { id, seatArr}:Seat = req.body;
        if(!id || !seatArr){
            return res.status(400).json({ message: "Missing required fields" });
        }
        for(const seat of seatArr){
            await db.execute("INSERT INTO seat (screen_id, seat_number, amount) VALUES (?, ?, ?)", [id, seat.seat_number, seat.amount]);
        }
        return res.status(201).json({ message: "Seats created successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error while creating seets" });
        
    }
}

export const getSeatsByScreenId = async (req: Request, res: Response) => {
    try {
        const{ id } = req.params;
        if(!id){    
            return res.status(400).json({ message: "Missing screen id" });
        }
        const [seats] = await db.execute("SELECT * FROM seat WHERE screen_id = ?", [id]);
        return res.status(200).json({ seats });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error while getting seats by screen id" });
    }
}

export const getSeatsForTheater = async (req: Request, res: Response) => {
    try {
        const { theaterId } = req.params;
        if (!theaterId) {
            return res.status(400).json({ message: "Missing theater id" });
        }

        const [theater]: any = await db.execute("SELECT * FROM theater WHERE id = ?", [theaterId]);

        const [screens]: any = await db.execute("SELECT * FROM screen WHERE theater_id = ?", [theater.id]);
        theater.screens = screens;

        for (const screen of screens) {
            const [seats]: any = await db.execute("SELECT * FROM seat WHERE screen_id = ?", [screen.id]);
            screen.seats = seats;
        }
        return res.status(200).json(theater); 
    } catch (error) {
        return res.status(500).json({ message: "Internal server error while getting seats for theater" });
    }
}
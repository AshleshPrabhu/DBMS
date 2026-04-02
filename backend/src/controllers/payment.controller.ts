import type { Request, Response } from "express";
import Razorpay from 'razorpay';
import crypto from "crypto";
import { db } from "../config/db.js";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function createOrder(req: Request, res: Response) {
    try {
        const { amount, currency } = req.body;

        if (!amount || !currency) {
            return res.status(400).json({ message: "Amount and currency are required" });
        }

        const options = {
            amount: amount * 100,
            currency,
            receipt: `receipt_order_${new Date().getTime()}`
        };
        const razorpayOrder = await razorpay.orders.create(options);

        res.json({
            message: "Order created successfully",
            order: {
                razorpay_order_id: razorpayOrder.id,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency
            }
        });

    } catch (error) {
        console.error("Create order error:", error);
        res.status(500).json({ error: "Failed to create order" });
    }
}

export async function verifyPayment(req: Request, res: Response) {
    const connection = await db.getConnection();
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, user_id, show_id, seat_ids, snacks } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !user_id || !show_id || !seat_ids?.length) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(401).json({ error: "Payment verification failed" });
        }

        await connection.beginTransaction();

        const [existing]: any = await connection.query(
            `SELECT seat_id FROM booking_seat WHERE show_id = ? AND seat_id IN (?)`,
            [show_id, seat_ids]
        );

        if (existing.length > 0) {
            await connection.rollback();
            return res.status(400).json({
                message: "Seats already booked",
                bookedSeats: existing.map((s: any) => s.seat_id)
            });
        }

        const [result]: any = await connection.execute(
            `INSERT INTO booking (user_id, show_id, razorpay_order_id) VALUES (?, ?, ?)`,
            [user_id, show_id, razorpay_order_id]
        );
        const bookingId = result.insertId;

        const seatValues = seat_ids.map((seat_id: number) => [bookingId, show_id, seat_id]);
        await connection.query(
            `INSERT INTO booking_seat (booking_id, show_id, seat_id) VALUES ?`,
            [seatValues]
        );

        if (snacks && snacks.length > 0) {
            const snackValues = snacks.map((snack: { id: number, quantity: number }) => [bookingId, snack.id, snack.quantity]);
            await connection.query(
                `INSERT INTO booking_snack (booking_id, snack_id, quantity) VALUES ?`,
                [snackValues]
            );
        }

        await connection.execute(
            `INSERT INTO payment (booking_id, razorpay_payment_id, razorpay_signature, status)
             VALUES (?, ?, ?, ?)`,
            [bookingId, razorpay_payment_id, razorpay_signature, 'success']
        );

        await connection.commit();

        res.json({ message: "Payment verified successfully", success: true });

    } catch (error) {
        await connection.rollback();
        console.error("Verify payment error:", error);
        res.status(500).json({ error: "An error occurred during payment verification" });
    } finally {
        connection.release();
    }
}

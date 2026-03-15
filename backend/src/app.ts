import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import locationRouter from "./routes/location.routes.js";
import theaterRouter from "./routes/theater.routes.js";
import screenRouter from "./routes/screen.routes.js";
import seatRouter from "./routes/seat.routes.js";
import movieRouter from "./routes/movie.routes.js";
import showsRouter from "./routes/shows.routes.js";
import bookingRouter from "./routes/booking.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors({
    origin: "*",
}))

app.use("/api/users", userRouter);
app.use("/api/locations", locationRouter);
app.use("/api/theaters", theaterRouter);
app.use("/api/screens", screenRouter);
app.use("/api/seats", seatRouter);
app.use("/api/movies", movieRouter);
app.use("/api/shows", showsRouter);
app.use("/api/bookings", bookingRouter);

export default app
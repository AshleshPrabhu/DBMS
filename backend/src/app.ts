import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import locationRouter from "./routes/location.routes.js";
import theaterRouter from "./routes/theater.controller.js";
import screenRouter from "./routes/screen.routes.js";

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


export default app
import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import locationRouter from "./routes/location.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors({
    origin: "*",
}))

app.use("/api/users", userRouter);
app.use("/api/locations", locationRouter);


export default app
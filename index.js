import express from "express";
import { connectDB } from "./config/index.js";
import dotenv from "dotenv";
import userRouter from "./routes/user/index.js";
import productRouter from "./routes/product/index.js";
import cors from "cors";

const app = express();
app.use(express.json());

// app.use(cors());
app.use(cors({ origin: "*" }));

dotenv.config();
connectDB();

app.use("/api/", userRouter, productRouter);

app.listen(3000, () => {
  console.log("App is running on port : 3000");
});

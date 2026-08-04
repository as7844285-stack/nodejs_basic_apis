import express from "express";
import { connectDB } from "./config/index.js";
import dotenv from "dotenv";
import userRouter from "./routes/user/index.js";
import productRouter from "./routes/product/index.js";
import cors from "cors";
import multer from "multer";
import wishlistRouter from "./routes/wishlist/index.js"
import cartRouter from "./routes/addToCart/cart.js"


const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// app.use(cors());
app.use(cors({ origin: "*" }));

dotenv.config();
connectDB();


app.use("/api/", userRouter, productRouter , wishlistRouter,cartRouter);

app.listen(3000, () => {
  console.log("App is running on port : 3000");
});

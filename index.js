// import express from "express";
// import { connectDB } from "./config/index.js";
// import dotenv from "dotenv";
// import userRouter from "./routes/user/index.js";
// import productRouter from "./routes/product/index.js";
// import cors from "cors";
// dotenv.config();
// import multer from "multer";
// import wishlistRouter from "./routes/wishlist/index.js";
// import cartRouter from "./routes/addToCart/cart.js";
// import orderRouter from "./routes/order/index.js";
// import adminRouter from "./routes/admin/index.js";
// import dns from "node:dns"; // or const dns = require('node:dns');
// dns.setDefaultResultOrder("ipv4first");

// const app = express();
// app.use(express.json());
// app.use("/uploads", express.static("uploads"));

// // app.use(cors());
// app.use(cors({ origin: "*" }));

// dotenv.config();
// connectDB();

// app.use(
//   "/api/",
//   userRouter,
//   productRouter,
//   wishlistRouter,
//   cartRouter,
//   orderRouter,
//   adminRouter,
// );

// app.listen(3000, () => {
//   console.log("App is running on port : 3000");
// });

import express from "express";
import dotenv from "dotenv";
import dns from "node:dns";
import cors from "cors";
import multer from "multer";

// 1. MUST BE FIRST: Load environment variables before ANY other local imports execute
dotenv.config();

// 2. MUST BE SECOND: Force Node.js to use Google Public DNS over your router's default DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// 3. Now safely import files that rely on process.env variables
import { connectDB } from "./config/index.js";
import userRouter from "./routes/user/index.js";
import productRouter from "./routes/product/index.js";
import wishlistRouter from "./routes/wishlist/index.js";
import cartRouter from "./routes/addToCart/cart.js";
import orderRouter from "./routes/order/index.js";
import adminRouter from "./routes/admin/index.js";

const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cors({ origin: "*" }));

// 4. Trigger database connection now that process.env.MONGO_URI is populated
connectDB();

app.use(
  "/api/",
  userRouter,
  productRouter,
  wishlistRouter,
  cartRouter,
  orderRouter,
  adminRouter,
);

app.listen(3000, () => {
  console.log("App is running on port : 3000");
});

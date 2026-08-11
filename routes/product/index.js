import { Product } from "../../models/product.js";
import {
  getProduct,
  addProduct,
  updateProduct,
  removeProduct,
} from "../../controllers/product/index.js";
import express, { Router } from "express";
import { authentication } from "../../midlaware.js";
import multer from "multer";
import { diskStorage } from "multer";
const router = express.Router();

router.get("/products", getProduct);

// router.post("/product", upload.single("image"), addProduct);

// router.put("/product/:id", upload.single("image"), updateProduct);

// router.delete("/product/:id", removeProduct);

export default router;

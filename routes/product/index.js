import { Product } from "../../models/product.js";
import {
  getProduct,
  addProduct,
  updateProduct,
  removeProduct,
  getMyProduct,
} from "../../controllers/product/index.js";
import express, { Router } from "express";
import { authentication } from "../../midlaware.js";

const router = express.Router();

router.get("/products-my",authentication, getMyProduct);

router.get("/products", getProduct);

router.post("/product", addProduct);

router.put("/product/:id", updateProduct);

router.delete("/product/:id",removeProduct);

export default router;

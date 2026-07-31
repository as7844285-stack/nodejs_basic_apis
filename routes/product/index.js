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
import multer from "multer";
import { diskStorage } from "multer";
const router = express.Router();

const fileStorage = diskStorage({
  destination: (req, res, cb) => {
    cb(null, './uploads')
  },
  filename: (req, res, cb) => {
    cb(null, Date.now() + "-" + res.originalname)
  }

});

const upload = multer({ storage: fileStorage })

router.get("/products-my",authentication, getMyProduct);

router.get("/products", getProduct);

router.post("/product", upload.single('image'), addProduct);

router.put("/product/:id", updateProduct);

router.delete("/product/:id",removeProduct);



export default router;

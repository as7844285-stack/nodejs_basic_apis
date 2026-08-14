import express from "express";

import upload from "../../middleware/multer.js";

import { addProduct } from "../../controllers/product/index.js";

const router = express.Router();

router.post("/product", upload.single("image"), addProduct);

export default router;

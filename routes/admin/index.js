import express from "express";
import {
  getAllOrders,
  updateOrderStatus,
} from "../../controllers/admin/admin.js";
import { isAdmin } from "../../midlaware.js";
import multer from "multer";
import { diskStorage } from "multer";
import {
  addProduct,
  removeProduct,
  updateProduct,
} from "../../controllers/product/index.js";

const router = express.Router();

const fileStorage = diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, res, cb) => {
    cb(null, Date.now() + "-" + res.originalname);
  },
});

const upload = multer({ storage: fileStorage });

router.get("/admin/orders", getAllOrders);
router.put("/admin/orders/:id/status", updateOrderStatus);

// // product routes already exist (addProduct/updateProduct/removeProduct) — just add isAdmin:
router.post("/product", upload.single("image"), addProduct);
router.put(
  "/product/:id",

  upload.single("image"),
  updateProduct,
);
router.delete("/product/:id", removeProduct);
export default router;

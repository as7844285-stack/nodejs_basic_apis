import express from "express";
import {
  getAllOrders,
  updateOrderStatus,
} from "../../controllers/admin/admin.js";
import { isAdmin } from "../../midlaware.js";

const router = express.Router();

router.get("/admin/orders", isAdmin, getAllOrders);
router.put("/admin/orders/:id/status", isAdmin, updateOrderStatus);

// // product routes already exist (addProduct/updateProduct/removeProduct) — just add isAdmin:
// router.post("/product", auth, isAdmin, upload.single("image"), addProduct);
// router.put("/product/:id", auth, isAdmin, upload.single("image"), updateProduct);
// router.delete("/product/:id", auth, isAdmin, removeProduct);
export default router;

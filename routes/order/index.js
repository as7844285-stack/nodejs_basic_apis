import express from "express";

import { authentication } from "../../midlaware.js";
import { getOrders, placeOrder } from "../../controllers/order/index.js";

const router = express.Router();

router.post("/order", authentication, placeOrder);
router.get("/orders", authentication, getOrders);

export default router;

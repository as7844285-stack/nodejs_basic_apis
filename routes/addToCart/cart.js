import express from "express";
import { getCart, postCart, removeCart } from "../../controllers/Cart/cart.js";
import { authentication } from "../../midlaware.js";

const router = express.Router();

router.post("/cart", authentication, postCart);
router.get("/cart", authentication, getCart);
router.delete("/cart", authentication, removeCart);

export default router;

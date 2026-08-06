import express from "express";
import {
  getCart,
  postCart,
  removeCart,
  updateQty,
} from "../../controllers/Cart/cart.js";
import { authentication } from "../../midlaware.js";

const router = express.Router();

router.post("/cart", authentication, postCart);
router.get("/cart", authentication, getCart);
router.delete("/cart", authentication, removeCart);
router.put("/cart", authentication, updateQty);

export default router;

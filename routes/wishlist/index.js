import express from "express";
import {
  getWhislist,
  postWishlist,
  removeWishlist,
} from "../../controllers/wishlist/index.js";
import { authentication } from "../../midlaware.js";

const router = express.Router();

router.post("/wishlist", authentication, postWishlist);
router.get("/wishlist", authentication, getWhislist);
router.delete("/wishlist/", authentication, removeWishlist);

export default router;


import express from "express";
import { getWhislist, postWishlist } from "../../controllers/wishlist/index.js";
import { authentication } from "../../midlaware.js";

const router = express.Router();

router.post("/wishlist",authentication, postWishlist);
router.get ("/wishlist",authentication, getWhislist);



export default router;




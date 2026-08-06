import { User } from "../../models/user.js";
import { Wishlist } from "../../models/wishlist.js";

export const postWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "productId is required" });
    }

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: userId,
        products: [{ product: productId }],
      });
    } else {
      const exists = wishlist.products.some(
        (item) => item.product.toString() === productId.toString(),
      );
      if (!exists) {
        wishlist.products.push({ product: productId });
      }
    }

    await wishlist.save();

    res.status(200).json({
      success: true,
      message: "Wishlist updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getWhislist = async (req, res) => {
  try {
    const userId = req.user.id;

    const wishlist = await Wishlist.findOne({ user: userId }).populate(
      "products.product",
    );

    const products = wishlist
      ? wishlist.products.map((item) => item.product)
      : [];

    res.status(200).json({
      message: "list fetch successfully",
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const removeWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "productId is required" });
    }

    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    wishlist.products = wishlist.products.filter(
      (item) => item.product.toString() !== productId.toString(),
    );

    await wishlist.save();

    return res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

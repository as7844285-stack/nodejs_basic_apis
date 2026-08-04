import { Cart } from "../../models/cart.js";
import { authentication } from "../../midlaware.js";

export const postCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({
        user: req.user.id,
        products: [
          {
            product: productId.toString(),
            quantity: quantity || 1,
          },
        ],
      });
    } else if (
      cart.products.some(
        (item) => item.product.toString() === productId.toString(),
      )
    ) {
      // Product already exists
    } else {
      cart.products.push({
        product: productId,
        quantity,
      });
    }

    await cart.save();

    res.json({
      success: true,
      message: "Product add to cart",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate(
      "products.product",
    );
    if (!cart) {
      return res.status(200).json({ success: true, data: { products: [] } });
    }
    res.status(201).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const removeCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId });

    cart.products = cart.products.filter(
      (itme) => itme.product.toString() !== productId.toString(),
    );
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product removed from Cart",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

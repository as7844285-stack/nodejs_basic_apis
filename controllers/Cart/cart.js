import { Cart } from "../../models/cart.js";
import { authentication } from "../../midlaware.js";

export const postCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    console.log("productId", productId);
    console.log("quantity", quantity);
    console.log("userId", req.user.id);

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

    console.log("productId ", productId);
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.products = cart.products.filter(
      (item) => item.product.toString() !== productId,
    );

    console.log("updated cart : ", cart);

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

export const updateQty = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "cart not found",
      });
    }
    const product = cart.products.find(
      (item) => item.product.toString() === productId,
    );
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }
    product.quantity = quantity;
    await cart.save();
    res.status(201).json({
      success: true,
      message: "Product add successfully ",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error not found",
      success: false,
    });
  }
};

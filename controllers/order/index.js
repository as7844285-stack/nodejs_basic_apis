import { Order } from "../../models/order.js";
import { Cart } from "../../models/cart.js"; // adjust path to your actual cart model

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId }).populate(
      "products.product",
    );

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const orderProducts = cart.products.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const totalAmount = orderProducts.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const order = await Order.create({
      user: userId,
      products: orderProducts,
      totalAmount,
    });
    const populatedOrder = await order.populate("products.product");
    // clear the cart after order is placed
    cart.products = [];
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: populatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId })
      .populate("products.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

import { Product } from "../../models/product.js";

export const addProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Product image is required",
      });
    }

    const product = new Product({
      name,

      description,

      price,

      image: file.path,
    });

    await product.save();

    res.status(201).json({
      success: true,

      message: "Product added successfully",

      data: product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

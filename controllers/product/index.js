import { Product } from "../../models/product.js";

export const getProduct = async (req, res) => {
  try {

    // const userId = req.user.id;
    // console.log("userId : ",userId);
    const product = await Product.find();
    res.status(200).json({
      message: "User fetched successully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyProduct = async (req, res) => {
  try {

    const userId = req.user.id;
    console.log("userId : ",userId);
    const product = await Product.find({user:userId}).populate("user" ,"name _id");
    res.status(200).json({
      message: "My product data fetched successully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name, user, price } = req.body;

    const product = new Product({
      name,
      user,
      price,
    });
    await product.save();

    res.status(201).json({
      success: true,
      message: "product Added Successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.parmas;
    const { name, price } = req.body;
    const product = await Product.findByIdAndUpdate({ _id: id });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }
    product.name = name;
    product.id = id;
    product.price = price;

    res.status(200).json({
      success: true,
      message: "product update successfully",
      data: product,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "product not found",
    });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const { id } = id.parmas;
    const product = await Product.findByIdAndDelete({ _id: id });

    if (!product) {
      res.status(404).json({
        success: false,
        message: "error 404",
      });

      res.status(201).json({
        success: true,
        message: "product deleted successfully",
        data: "prodcut",
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "product not found",
    });
  }
};

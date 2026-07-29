import { User } from "../../models/user.js";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({
      message: "User fetched successully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getIdUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById({ _id: id });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    // const { id } = req.body;
    const { email, password } = req.body;

    const existUser = await User.findOne({ email, password });

    if (!existUser) {
      return res.status(400).json({
        message: "Not found",
      });
    }

    const token = jwt.sign(
      {id: existUser._id,
        name:existUser.name,
        email:existUser.email
      },
      process.env.JWT_SECRET,
    );
    return res.status(200).json({
      data:req.body,
      user:existUser,
      message: "login successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const updateUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, work } = req.body;
    const user = await User.findByIdAndUpdate({ _id: id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    user.name = name;
    user.work = work;

    res.status(200).json({
      success: true,
      message: "user Updated Successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete({ _id: id });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "user deleted successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

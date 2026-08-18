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

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("body", req.body);

    const isExist = await User.findOne({ email });
    if (isExist) {
      return res.status(404).json({
        success: false,
        message: "User already exist",
      });
    }
    const user = new User({
      name,
      email,
      password,
    });
    await user.save();
    res.status(201).json({
      success: true,
      message: "Signup/register successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// export const login = async (req, res) => {
//   try {
//     // const {id}= req.body;
//     const { email, password } = req.body;

//     const existUser = await User.findOne({ email, password });

//     if (!existUser) {
//       res.status(500).json({
//         message: "something want wrong",
//         success: "true",
//       });
//     }
//     const token = jwt.sign(
//       {
//         id: existUser._id,
//         email: existUser.email,
//       },
//       process.env.JWT_SECRET,
//     );

//     return res.status(201).json({
//       data: req.body,
//       message: "Login successful",
//       success: true,
//       token,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(404).json({
//       message: "error is here",
//     });
//   }
// };

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Email se user find karo
    const existUser = await User.findOne({ email });

    // 2. User nahi mila
    if (!existUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // 3. Password check karo
    const isPasswordMatch = await bcrypt.compare(password, existUser.password);

    // 4. Password galat hai
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    // 5. JWT token banao
    const token = jwt.sign(
      {
        id: existUser._id,
        email: existUser.email,
      },
      process.env.JWT_SECRET,
    );

    // 6. Successful response
    return res.status(200).json({
      message: "Login successful",
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

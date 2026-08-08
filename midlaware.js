import jwt from "jsonwebtoken";
// import { User } from "../models/user.js";

function validateUserCreation(req, res, next) {
  const { id, name, branch } = req.body;
  if (!id || id.length < 2) {
    return res.status(400).json({ error: "need 2 at least" });
  }
  if (!name || name.length < 3) {
    return res.status(400).json({ error: "add at least 3 word" });
  }
  if (!branch || branch.length < 3) {
    return res.status(400).json({ error: "branch name only bro" });
  }
  next();
}

export { validateUserCreation };

function authentication(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  console.log("header : ", token);
  if (!token) {
    return res.status(401).json({ message: "Please login" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("decoded", decoded);
    req.user = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
    };

    next();
  } catch (error) {
    res.status(404).json({ message: "Invalid Token" });
  }
}

export { authentication };

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.isAdmin) {
      return res
        .status(403)
        .json({ success: false, message: "Admin access required" });
    }
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

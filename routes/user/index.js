import { User } from "../../models/user.js";
import {
  getUsers,
  getIdUsers,
  updateUsers,
  deleteUsers,
  login,
} from "../../controllers/user/index.js";

import express from "express";

const router = express.Router();

router.post("/user/login", login);

router.get("/user", getUsers);

router.get("/user/:id", getIdUsers);

router.put("/user/:id", updateUsers);

router.delete("/user/:id", deleteUsers);

export default router;

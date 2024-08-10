import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  newUser,
} from "../controllers/user.js";
import { adminOnly, verifyToken } from "../middlewares/auth.js";
import { check } from "express-validator";

const app = express.Router();

app.post("/me", verifyToken, newUser);

// route - /api/v1/user/new
//new means register
app.post(
  "/new",
  [
    check("name", "Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  newUser
);

// Route - /api/v1/user/all
app.get("/all", adminOnly, getAllUsers);

// Route - /api/v1/user/dynamicID
app.route("/:id").get(getUser).delete(adminOnly, deleteUser);

export default app;

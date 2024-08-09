import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { NewUserType } from "../types/types.js";

const newUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

newUserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const NewUser = mongoose.model<NewUserType>("NewUser", newUserSchema);

export default NewUser;

import express from "express";
import {
  signUp,
  login,
  getProfile,
  updateProfile,
  deleteProfile,
} from "../controller/userController.js";
import authenticate from "../middleware/authenticateMiddleWare.js";
export const userRouter = express.Router();
userRouter.post("/sign-up", signUp);
userRouter.post("/login", login);

userRouter.get("/profile", authenticate, getProfile);
userRouter.put("/profile", authenticate, updateProfile);
userRouter.delete("/profile", authenticate, deleteProfile);

import express from "express";
import { signUp, login, getProfile } from "../controller/userController.js";
import authenticate from "../middleware/authenticateMiddleWare.js";
export const userRouter = express.Router();
userRouter.post("/sign-up", signUp);
userRouter.post("/login", login);

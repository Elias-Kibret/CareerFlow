import express from "express";
import { signUp, login } from "../controller/userController.js";

export const userRouter = express.Router();
userRouter.post("/sign-up", signUp);
userRouter.post("/login", login);

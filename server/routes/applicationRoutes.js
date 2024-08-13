// routes/applicationRoutes.js
import express from "express";
import multer from "multer";
import { applyForJob } from "../controller/Application.js";
import authenticate from "../middleware/authenticateMiddleWare.js";

export const applicationRouter = express.Router();
const upload = multer({ dest: "uploads/" }); // Adjust your file upload settings

applicationRouter.post(
  "/apply",
  authenticate,
  upload.single("resume"),
  applyForJob
);

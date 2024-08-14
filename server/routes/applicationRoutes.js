// routes/applicationRoutes.js
import express from "express";

import {
  applyForJobWithFileUpload,
  applyForJob,
} from "../controller/Application.js";
import authenticate from "../middleware/authenticateMiddleWare.js";

export const applicationRouter = express.Router();

applicationRouter.post("/apply/:jobId", applyForJobWithFileUpload, applyForJob);

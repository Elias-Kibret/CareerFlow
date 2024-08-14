import express from "express";

import {
  createJob,
  searchJobBy,
  updateJob,
  updateJobStatus,
  getJobsForUser,
  
  getJobDetails,
} from "../controller/jobController.js";
import authenticate from "../middleware/authenticateMiddleWare.js";

export const jobRouter = express.Router();

jobRouter.post("/create", authenticate, createJob);
jobRouter.post("/search", authenticate, searchJobBy);
jobRouter.put("/update", authenticate, updateJob);
jobRouter.put("/update-status", authenticate, updateJobStatus);
jobRouter.get("/allJobs", authenticate, getJobsForUser);

// jobRouter.post("/apply/:jobId", authenticate, applyForJob);
jobRouter.get("/:jobId", getJobDetails);

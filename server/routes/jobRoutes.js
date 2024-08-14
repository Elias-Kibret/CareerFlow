import express from "express";

import {
  createJob,
  searchJobBy,
  updateJob,
  updateJobStatus,
  getJobsForUser,
  fetchEmployerJobs,
  getJobDetails,
  deleteJob,
} from "../controller/jobController.js";
import authenticate from "../middleware/authenticateMiddleWare.js";

export const jobRouter = express.Router();

jobRouter.post("/create", createJob);
jobRouter.post("/search", authenticate, searchJobBy);
// jobRouter.put("/update", authenticate, updateJob);
jobRouter.put("/update-status", authenticate, updateJobStatus);
jobRouter.get("/allJobs", authenticate, getJobsForUser);
jobRouter.get("/by-employer", authenticate, fetchEmployerJobs);

// jobRouter.post("/apply/:jobId", authenticate, applyForJob);
jobRouter.get("/:jobId", getJobDetails);
jobRouter.delete("/:jobId", authenticate, deleteJob);
jobRouter.put("/:jobId", authenticate, updateJob);

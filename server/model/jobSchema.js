import mongoose from "mongoose";
const { Schema } = mongoose;

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number, required: true },
  company: { type: String, required: true },
  jobType: {
    type: String,
  },
  status: {
    type: String,
    enum: ["open", "hired", "interview", "closed"],
    default: "open",
  },
  skills: [{ type: String }],
  postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  applicants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to run before saving a job
jobSchema.pre("save", function (next) {
  // Example: Set updatedAt to the current date
  this.updatedAt = Date.now();
  next();
});

export const Job = mongoose.model("Job", jobSchema);

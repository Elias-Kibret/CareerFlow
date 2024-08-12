import mongoose from "mongoose";
const { Schema } = mongoose;

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number, required: true },
  company: { type: String, required: true },
  jobType: { type: String, required: true },
  status: {
    type: String,
    enum: ["open", "hired", "interview", "closed"],
    default: "open",
  },
  skills: [{ type: String }],
  postedBy: { type: Schema.Types.ObjectID, ref: "User", required: true },
  applicants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Job = mongoose.model("Job", jobSchema);

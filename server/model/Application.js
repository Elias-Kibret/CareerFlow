import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // This tells Mongoose that `userId` references the User model
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job", // This tells Mongoose that `jobId` references the Job model
    required: true,
  },
  phoneNumber: {
    type: String,
    maxlength: 20,
  },
  yearsOfExperience: {
    type: Number,
    min: 0,
  },
  coverLetter: {
    type: String,
  },
  resume: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume", // This tells Mongoose that `resume` references the Resume model
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Application = mongoose.model("Application", ApplicationSchema);

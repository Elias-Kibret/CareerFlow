import multer from "multer";
import path from "path";
import { Application } from "../model/Application.js";
import { Resume } from "../model/Resume.js";
import { User } from "../model/user.js";
import { Job } from "../model/jobSchema.js";

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to file name
  },
});

const upload = multer({ storage });

// Apply multer middleware for handling file uploads
export const applyForJobWithFileUpload = upload.single("resume");

// Apply for job handler
export const applyForJob = async (req, res) => {
  try {
    const { userId, jobId, phoneNumber, yearsOfExperience, coverLetter } =
      req.body;
    const resumeFile = req.file;

    // Log the received data for debugging
    console.log("Received fields:", {
      userId,
      jobId,
      phoneNumber,
      yearsOfExperience,
      coverLetter,
    });
    console.log("Resume file:", resumeFile);

    if (!userId || !jobId) {
      return res.status(400).json({ error: "User ID and Job ID are required" });
    }

    // Validate user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Validate job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    let resume;
    if (resumeFile) {
      // Save resume file and create a resume record
      resume = await Resume.create({ userId, fileUrl: resumeFile.path });
    }

    // Create application
    const application = await Application.create({
      userId,
      jobId,
      phoneNumber,
      yearsOfExperience,
      coverLetter,
      resume: resume ? resume._id : undefined,
    });

    console.log("Application created:", application);

    res
      .status(201)
      .json({ message: "Application submitted successfully", application });
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ error: "Internal Server Error" });
  }
};

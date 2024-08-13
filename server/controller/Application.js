import { Application } from "../model/Application.js";
import { Resume } from "../model/Resume.js";
import { User } from "../model/user.js";
import { Job } from "../model/jobSchema.js";

export const applyForJob = async (req, res) => {
  try {
    const { userId, jobId, phoneNumber, yearsOfExperience, coverLetter } =
      req.body;
    const resumeFile = req.file;

    // Validate user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Validate job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({ error: "Job not found" });
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

    res
      .status(201)
      .json({ message: "Application submitted successfully", application });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

import { Job } from "../model/jobSchema.js";
import { User } from "../model/user.js";
export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      salary,
      company,
      jobType,
      skills,
      postedBy,
    } = req.body;

    // Log incoming data for debugging
    console.log("Received data:", req.body);

    // Validate jobType to ensure it's an array

    // Create a new job document
    const newJob = new Job({
      title,
      description,
      location,
      salary,
      company,
      jobType,
      skills,
      postedBy,
    });

    // Save the job to the database
    await newJob.save();

    // Log success
    console.log("Job created successfully:", newJob);

    // Send success response
    res.status(201).json({ message: "Job created successfully" });
  } catch (error) {
    // Log the error
    console.error("Error creating job:", error);

    // Send error response
    res.status(500).json({ message: "Failed to create job" });
  }
};

export const searchJobBy = async (req, res) => {
  try {
    const { title, location, jobType, skills } = req.query;
    const query = {};
    if (title) query.title = { $regex: title, $options: "i" };
    if (location) query.location = { $regex: location, $options: "i" };
    if (jobType) query.jobType = { $in: jobType.split(",") };
    if (skills) query.skills = { $all: skills.split(",") };
    const jobs = await Job.find(query);
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ message: "Failed to search jobs" }, error);
  }
};

// export const updateJob = async (req, res) => {
//   try {
//     if (req.user.role !== "employer") {
//       return res
//         .status(403)
//         .json({ message: "You are not authorized to update this job" });
//     }
//     const { jobId } = req.params;
//     const updates = req.body;

//     const allowedUpdates = [
//       "title",
//       "description",
//       "location",
//       "salary",
//       "company",
//       "jobType",
//       "skills",
//       "status",
//     ];

//     const updatesToAppy = {};

//     Object.keys(updates).forEach((update) => {
//       if (allowedUpdates.includes(update)) {
//         updatesToAppy[update] = updates[update];
//       }
//     });

//     const job = await Job.findOneAndUpdate(
//       { _id: jobId, postedBy: req.user.userId },
//       updatesToAppy,
//       { new: true, runValidators: true }
//     );

//     if (!job) {
//       return res
//         .status(404)
//         .json({ message: "Job not found or not authorized" });
//     }
//     res.status(200).json({ job });
//   } catch {
//     res.status(500).json({ message: "Failed to update job" });
//   }
// };

export const updateJobStatus = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { status } = req.body;

    const validStatuses = ["open", "hired", "interview", "closed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const user = req.user;

    if (user.role !== "employer") {
      return res
        .status(403)
        .json({ message: "You are not authorized to update job status" });
    }

    const job = await Job.findOneAndUpdate(
      { _id: jobId, postedBy: user.userId },
      { status },
      { new: true, runValidators: true }
    );
    if (!job) {
      return res
        .status(404)
        .json({ message: "Job not found or not authorized" });
    }
    res.status(200).json({ job });
  } catch (error) {
    res.status(500).json({ message: "Failed to update job status", error });
  }
};

export const getJobsForUser = async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming userId is available from authentication middleware
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { skills: userSkills, interestedSkills, employeeDetails } = user;
    const { jobType: preferredJobType } = employeeDetails;

    // Fetch all jobs
    let jobs = await Job.find();

    // Calculate relevance
    const calculateRelevance = (job, userSkills, interestedSkills) => {
      const jobSkills = new Set(job.skills);
      const userSkillSet = new Set(userSkills);
      const interestedSkillSet = new Set(interestedSkills);

      const commonSkills = [...jobSkills].filter(
        (skill) => userSkillSet.has(skill) || interestedSkillSet.has(skill)
      );
      return commonSkills.length;
    };

    // Sort jobs by relevance and then by job type
    jobs = jobs
      .map((job) => ({
        ...job._doc, // Convert mongoose document to plain object
        relevance: calculateRelevance(job, userSkills, interestedSkills),
      }))
      .sort(
        (a, b) =>
          b.relevance - a.relevance ||
          (preferredJobType ? (a.jobType === preferredJobType ? -1 : 1) : 0)
      );

    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ message: "Failed to get jobs", error });
  }
};

// export const applyForJob = async (req, res) => {
//   try {
//     const { jobId } = req.params;
//     const userId = req.user.userId;

//     // Find the job and add the user to the applicants array
//     const job = await Job.findById(jobId);

//     if (!job) {
//       return res.status(404).json({ message: "Job not found" });
//     }

//     if (job.applicants.includes(userId)) {
//       return res.status(400).json({ message: "Already applied for this job" });
//     }

//     job.applicants.push(userId);
//     await job.save();
//     console.log("hey");

//     res.status(200).json({ message: "Applied successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to apply for job", error });
//   }
// };

export const getJobDetails = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ job });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch job details", error });
  }
};
export const fetchEmployerJobs = async (req, res) => {
  console.log(req.user);
  try {
    // Extract the employer ID from the logged-in user's token
    const employerId = req.user.userId; // Check if req.user is defined

    console.log("Employer ID:", employerId);

    // Find the user by ID to check their role
    if (!employerId) {
      return res.status(400).json({ message: "No employer ID found" });
    }

    const user = await User.findById(employerId);
    console.log("User:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is an employer
    if (user.role !== "employer") {
      return res
        .status(403)
        .json({ message: "Access denied. User is not an employer." });
    }

    // Find all jobs posted by the employer
    const jobs = await Job.find({ postedBy: employerId });

    if (!jobs.length) {
      return res
        .status(404)
        .json({ message: "No jobs found for this employer" });
    }

    res.status(200).json({ jobs });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteJob = async (req, res) => {
  try {
    // Extract the job ID from the request parameters
    const jobId = req.params.jobId;
    const employerId = req.user.userId;

    // Check if employerId is available
    if (!employerId) {
      return res.status(400).json({ message: "Invalid employer ID" });
    }

    // Find the job by ID
    const job = await Job.findById(jobId);

    // Check if the job exists
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if the job is posted by the logged-in employer
    if (job.postedBy.toString() !== employerId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this job" });
    }

    // Delete the job
    await Job.findByIdAndDelete(jobId);

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateJob = async (req, res) => {
  const { jobId } = req.params;
  const updatedJobData = req.body;
  console.log(updatedJobData);

  try {
    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Update the job with new data
    const updatedJob = await Job.findByIdAndUpdate(jobId, updatedJobData, {
      new: true, // Return the updated job
      runValidators: true, // Validate the updated data
    });

    // Respond with the updated job
    res.status(200).json({ job: updatedJob });
  } catch (error) {
    // Handle errors
    console.error("Error updating job:", error);
    res.status(500).json({
      message: error.message || "Failed to update job",
    });
  }
};

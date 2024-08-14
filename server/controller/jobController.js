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

    await newJob.save();
    res.status(201).json({ message: "Job created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create job" }, error);
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

export const updateJob = async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this job" });
    }
    const { jobId } = req.params;
    const updates = req.body;

    const allowedUpdates = [
      "title",
      "description",
      "location",
      "salary",
      "company",
      "jobType",
      "skills",
      "status",
    ];

    const updatesToAppy = {};

    Object.keys(updates).forEach((update) => {
      if (allowedUpdates.includes(update)) {
        updatesToAppy[update] = updates[update];
      }
    });

    const job = await Job.findOneAndUpdate(
      { _id: jobId, postedBy: req.user.userId },
      updatesToAppy,
      { new: true, runValidators: true }
    );

    if (!job) {
      return res
        .status(404)
        .json({ message: "Job not found or not authorized" });
    }
    res.status(200).json({ job });
  } catch {
    res.status(500).json({ message: "Failed to update job" });
  }
};

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

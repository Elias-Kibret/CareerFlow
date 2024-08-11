import { Job } from "../model/jobSchema.js";
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


export const searchJobBy=async (req,res)=>{
    try {
        
    }
    catch (error) {

    }
}

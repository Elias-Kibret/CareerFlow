import mongoose from "mongoose";
import { Job } from "./model/jobSchema.js"; // Update the path to your Job model
import dotenv from "dotenv";
dotenv.config();

// Replace with your MongoDB connection string
const mongoURL = process.env.MONGO_URL;

const userId = "66bbb6378769ce56d0368787"; // Example user ID

const jobs = [
  {
    title: "Software Engineer",
    description: "Develop and maintain software applications.",
    location: "San Francisco, CA",
    salary: 120000,
    company: "Tech Innovators Inc.",
    jobType: "Full-time",
    postedBy: userId,
    applicants: [],
  },
  {
    title: "Data Scientist",
    description: "Analyze and interpret complex data sets.",
    location: "New York, NY",
    salary: 110000,
    company: "Data Insights LLC",
    jobType: "Full-time",
    postedBy: userId,
    applicants: [],
  },
  {
    title: "Project Manager",
    description: "Manage project timelines and resources.",
    location: "Chicago, IL",
    salary: 100000,
    company: "Management Pros",
    jobType: "Contract",
    postedBy: userId,
    applicants: [],
  },
  {
    title: "UX Designer",
    description: "Design user-friendly interfaces and experiences.",
    location: "Austin, TX",
    salary: 95000,
    company: "Design Masters",
    jobType: "Full-time",
    postedBy: userId,
    applicants: [],
  },
  {
    title: "Marketing Specialist",
    description: "Develop and implement marketing strategies.",
    location: "Los Angeles, CA",
    salary: 85000,
    company: "Marketing Experts",
    jobType: "Part-time",
    postedBy: userId,
    applicants: [],
  },
  {
    title: "Systems Administrator",
    description: "Maintain and support IT systems and infrastructure.",
    location: "Seattle, WA",
    salary: 90000,
    company: "Tech Solutions",
    jobType: "Full-time",
    postedBy: userId,
    applicants: [],
  },
  {
    title: "Content Writer",
    description: "Create engaging content for digital platforms.",
    location: "Remote",
    salary: 70000,
    company: "Content Creators",
    jobType: "Freelance",
    postedBy: userId,
    applicants: [],
  },
  {
    title: "Sales Associate",
    description: "Manage sales transactions and customer relationships.",
    location: "Miami, FL",
    salary: 60000,
    company: "Retail Masters",
    jobType: "Full-time",
    postedBy: userId,
    applicants: [],
  },
  {
    title: "Graphic Designer",
    description: "Create visual content for marketing and branding.",
    location: "Denver, CO",
    salary: 75000,
    company: "Creative Agency",
    jobType: "Contract",
    postedBy: userId,
    applicants: [],
  },
  {
    title: "Customer Support Specialist",
    description: "Assist customers with inquiries and issues.",
    location: "Phoenix, AZ",
    salary: 65000,
    company: "Support Services",
    jobType: "Full-time",
    postedBy: userId,
    applicants: [],
  },
];

const seedJobs = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Insert jobs into the database
    await Job.insertMany(jobs);

    console.log("Jobs successfully inserted");
  } catch (error) {
    console.error("Error inserting jobs:", error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
};

seedJobs();

import React, { useState } from "react";
import useUserStore from "../Store/userStore";

export const CreateJobForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    company: "",
    jobType: "",
    skills: "",
  });
  const [error, setError] = useState(null);
  const { createJob } = useUserStore((state) => ({
    createJob: state.createJob,
  }));

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert skills from a comma-separated string to an array
    const skillsArray = formData.skills.split(",").map((skill) => skill.trim());

    const { success } = await createJob({ ...formData, skills: skillsArray });
    if (success) {
      // Handle successful job creation (e.g., redirect or show a success message)
      alert("Job created successfully!");
      setFormData({
        title: "",
        description: "",
        location: "",
        salary: "",
        company: "",
        jobType: "",
        skills: "",
      });
    } else {
      setError("Failed to create job. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-semibold mb-8 text-center text-blue-800">
          Create a New Job
        </h1>
        {error && <p className="text-red-600 mb-6 text-center">{error}</p>}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* First Column */}
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="text-gray-800 text-sm font-medium mb-2"
            >
              Job Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="text-gray-800 text-sm font-medium mb-2"
            >
              Job Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="location"
              className="text-gray-800 text-sm font-medium mb-2"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={handleChange}
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="salary"
              className="text-gray-800 text-sm font-medium mb-2"
            >
              Salary
            </label>
            <input
              type="number"
              id="salary"
              value={formData.salary}
              onChange={handleChange}
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="company"
              className="text-gray-800 text-sm font-medium mb-2"
            >
              Company
            </label>
            <input
              type="text"
              id="company"
              value={formData.company}
              onChange={handleChange}
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="jobType"
              className="text-gray-800 text-sm font-medium mb-2"
            >
              Job Type
            </label>
            <input
              type="text"
              id="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex flex-col md:col-span-2">
            <label
              htmlFor="skills"
              className="text-gray-800 text-sm font-medium mb-2"
            >
              Skills (comma-separated)
            </label>
            <input
              type="text"
              id="skills"
              value={formData.skills}
              onChange={handleChange}
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
          >
            Create Job
          </button>
        </form>
      </div>
    </div>
  );
};

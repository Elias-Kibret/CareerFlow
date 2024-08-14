import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    postedBy: "", // Initially empty
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  // Retrieve userId and createJob from the store
  const { createJob, user, fetchUserProfile } = useUserStore((state) => ({
    createJob: state.createJob,
    user: state.user,
    fetchUserProfile: state.fetchUserProfile, // Ensure this function is available
  }));

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile when the component mounts
    const fetchData = async () => {
      await fetchUserProfile(); // Ensure user profile is fetched
      setLoading(false);
    };

    fetchData();
  }, [fetchUserProfile]);

  useEffect(() => {
    if (user) {
      setFormData((prevState) => ({
        ...prevState,
        postedBy: user._id || "", // Ensure user._id is available
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert skills from a comma-separated string to an array
    const skillsArray = formData.skills.split(",").map((skill) => skill.trim());

    // Ensure postedBy is included in the data sent to the backend
    const jobData = {
      ...formData,
      skills: skillsArray,
      postedBy: formData.postedBy, // This should hold the current user ID
    };

    try {
      const { success } = await createJob(jobData);
      if (success) {
        navigate("/success-created-job");
        setFormData({
          title: "",
          description: "",
          location: "",
          salary: "",
          company: "",
          jobType: "",
          skills: "",
          postedBy: formData.postedBy, // Keep postedBy as is
        });
      } else {
        setError("Failed to create job. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4">
        <div className="text-lg font-medium text-gray-700">Loading...</div>
      </div>
    );
  }

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
          {/* Form fields */}
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
            <select
              id="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select job type</option>
              <option value="parttime">Part-time</option>
              <option value="fulltime">Full-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
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

// src/components/CreateJobForm.js
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
      <div className="flex items-center justify-center min-h-screen py-12 px-4">
        <div className="text-lg font-medium text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center py-12 px-4 ">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-2xl p-16">
        <h1 className="text-4xl font-bold  mb-12 text-center text-orange-500">
          Create a New Job
        </h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 mb-2">
              Job Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 mb-2">
              Job Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows="4"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="salary" className="block text-gray-700 mb-2">
              Salary
            </label>
            <input
              type="number"
              id="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="company" className="block text-gray-700 mb-2">
              Company
            </label>
            <input
              type="text"
              id="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="jobType" className="block text-gray-700 mb-2">
              Job Type
            </label>
            <select
              id="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value="">Select job type</option>
              <option value="parttime">Part-time</option>
              <option value="fulltime">Full-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="skills" className="block text-gray-700 mb-2">
              Skills (comma-separated)
            </label>
            <input
              type="text"
              id="skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              Create Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

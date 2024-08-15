import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useUserStore from "../Store/userStore";

export const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const {
    getJobDetails,
    applyForJob,
    jobDetails,
    loading,
    error,
    user,
    fetchUserProfile,
  } = useUserStore((state) => ({
    getJobDetails: state.getJobDetails,
    applyForJob: state.applyForJob,
    jobDetails: state.jobDetails,
    loading: state.loading,
    error: state.error,
    user: state.user,
    fetchUserProfile: state.fetchUserProfile,
  }));

  const [formData, setFormData] = useState({
    phone: "",
    experience: "",
    coverLetter: "",
    resume: null,
  });

  useEffect(() => {
    if (jobId) {
      getJobDetails(jobId);
    }
    fetchUserProfile();
  }, [jobId, getJobDetails, fetchUserProfile]);

  useEffect(() => {
    if (user) {
      setFormData((prevState) => ({
        ...prevState,
        phone: user.phone || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      resume: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      userId: user._id,
      phoneNumber: formData.phone,
      yearsOfExperience: formData.experience,
      coverLetter: formData.coverLetter,
      resume: formData.resume,
    };

    try {
      console.log(data);
      await applyForJob(jobId, data);
      navigate("/success"); // Redirect to job list or success page
    } catch (err) {
      console.error("Failed to apply for job", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-medium text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-medium text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!jobDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-medium text-gray-700">
          Job details not found
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 bg-gray-100">
      <div className="container mx-auto bg-white rounded-3xl shadow-lg">
        {/* Job Details Header */}
        <div className="bg-gray-800 text-white p-6 rounded-t-3xl">
          <h2 className="text-3xl font-bold">
            {jobDetails.title || "No Title Available"}
          </h2>
          <p className="text-lg mt-2">
            {jobDetails.location || "Location not provided"}
          </p>
          <p className="mt-4 text-lg">
            {jobDetails.description || "No Description Available"}
          </p>
          <p className="mt-2 text-lg">
            Salary: ${jobDetails.salary || "Not disclosed"}
          </p>
        </div>
        {/* Company Details */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Company Details
          </h3>
          <p className="text-lg mb-2">
            {jobDetails.companyName || "Company name not available"}
          </p>
          <p className="text-gray-700 text-lg">
            {jobDetails.companyDescription ||
              "Company description not available"}
          </p>
        </div>
        {/* Application Form */}
        <div className="p-6 border-t border-gray-200 bg-gray-100 rounded-b-3xl">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Apply for this Job
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500 px-4 py-2 bg-white"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Years of Experience
                </label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500 px-4 py-2 bg-white"
                  min="0"
                  placeholder="Enter your years of experience"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Cover Letter
              </label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500 px-4 py-2 bg-white"
                rows="4"
                placeholder="Write your cover letter here"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Resume (PDF only)
              </label>
              <input
                type="file"
                name="resume"
                accept=".pdf"
                onChange={handleFileChange}
                className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-500 focus:border-gray-500 px-4 py-2 bg-white"
              />
              {formData.resume && (
                <p className="mt-2 text-gray-500 text-sm">
                  Selected file: {formData.resume.name}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300 ease-in-out"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

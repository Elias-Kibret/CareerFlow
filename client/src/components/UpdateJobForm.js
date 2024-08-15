import React, { useState, useEffect } from "react";
import { ManageJobsInfo } from "./ManageJobsInfo.js"; // Import the ManageJobsInfo component

export const UpdateJobForm = ({ job, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({ ...job });

  useEffect(() => {
    setFormData({ ...job });
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData); // Send formData back to parent
  };

  return (
    <div>
      <ManageJobsInfo />
      <div className="w-full flex justify-center py-12 px-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-2xl p-8">
          <h1 className="text-3xl font-bold mb-8 text-center text-orange-500">
            Update Job
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-12">
              <label
                htmlFor="title"
                className="block text-gray-700 mb-8 font-bold"
              >
                Job Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter job title"
                required
              />
            </div>
            <div className="mb-12">
              <label
                htmlFor="description"
                className="block text-gray-700 mb-8 font-bold"
              >
                Job Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter job description"
                rows="6"
                required
              />
            </div>
            <div className="mb-12">
              <label
                htmlFor="location"
                className="block text-gray-700 mb-8 font-bold"
              >
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter job location"
                required
              />
            </div>
            <div className="mb-12">
              <label
                htmlFor="salary"
                className="block text-gray-700 mb-8 font-bold"
              >
                Salary
              </label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter salary amount"
                required
              />
            </div>
            <div className="mb-12">
              <label
                htmlFor="company"
                className="block text-gray-700 mb-8 font-bold"
              >
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter company name"
                required
              />
            </div>
            <div className="mb-12">
              <label
                htmlFor="jobType"
                className="block text-gray-700 mb-8 font-bold"
              >
                Job Type
              </label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="">Select job type</option>
                <option value="parttime">Part-time</option>
                <option value="fulltime">Full-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            <div className="mb-12">
              <label
                htmlFor="skills"
                className="block text-gray-700 mb-8 font-bold"
              >
                Skills (comma-separated)
              </label>
              <input
                type="text"
                name="skills"
                value={formData.skills.join(", ")}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    skills: e.target.value
                      .split(",")
                      .map((skill) => skill.trim()),
                  }))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter skills, separated by commas"
                required
              />
            </div>
            <div className="flex items-center justify-center space-x-6 mt-32">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

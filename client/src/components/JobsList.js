import React, { useEffect, useState } from "react";
import useUserStore from "../Store/userStore";
import { UpdateJobForm } from "./UpdateJobForm.js";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Function to truncate text if it exceeds a certain length
const truncateText = (text, length = 100) => {
  return text.length > length ? `${text.substring(0, length)}...` : text;
};

export const JobsList = () => {
  const { jobs, loading, error, fetchJobsByEmployer, deleteJob, updateJob } =
    useUserStore((state) => ({
      jobs: state.jobs,
      loading: state.loading,
      error: state.error,
      fetchJobsByEmployer: state.fetchJobsByEmployer,
      deleteJob: state.deleteJob,
      updateJob: state.updateJob,
    }));

  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    fetchJobsByEmployer();
  }, [fetchJobsByEmployer]);

  if (loading)
    return (
      <div className="text-center text-lg font-medium text-gray-700 py-12">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-lg font-medium text-red-600 py-12">
        Error: {error}
      </div>
    );

  const handleDelete = async (job) => {
    const confirm = window.confirm("Are you sure you want to delete this job?");
    if (confirm) {
      try {
        await deleteJob(job._id);
        alert("Job deleted successfully");
      } catch (error) {
        alert("Failed to delete job");
      }
    }
  };

  const handleUpdate = async (updatedJob) => {
    try {
      const success = await updateJob(updatedJob._id, updatedJob);
      if (success) {
        alert("Job updated successfully");
        setEditingJob(null);
      } else {
        alert("Failed to update job");
      }
    } catch (error) {
      alert("Failed to update job");
    }
  };

  const handleCancelUpdate = () => {
    setEditingJob(null);
  };

  return (
    <div className="py-16 px-4 ">
      <div className="container mx-auto mb-16">
        <h1 className="text-6xl font-bold text-gray-900 mt-24 mb-24">
          Your Posted Jobs
        </h1>
        {editingJob ? (
          <UpdateJobForm
            job={editingJob}
            onUpdate={handleUpdate}
            onCancel={handleCancelUpdate}
          />
        ) : jobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 text-lg">No jobs found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job, index) => {
              // Set background color based on index
              const backgroundClass =
                index % 2 === 0 ? "bg-white" : "bg-[#F2994A]";

              return (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.3)",
                    transition: { duration: 0.3, ease: "easeInOut" },
                  }}
                  className={`flex flex-col p-8 rounded-2xl shadow-lg ${backgroundClass}`}
                >
                  <h2
                    className={`text-2xl font-bold mb-2 ${
                      backgroundClass === "bg-[#F2994A]"
                        ? "text-white"
                        : "text-gray-800"
                    }`}
                  >
                    {job.title}
                  </h2>
                  <p
                    className={`text-sm ${
                      backgroundClass === "bg-[#F2994A]"
                        ? "text-white"
                        : "text-gray-700"
                    }`}
                  >
                    {job.location}
                  </p>
                  <p className={`text-sm text-gray-700 mb-4 truncate`}>
                    {truncateText(job.description)}
                  </p>
                  <p className="text-gray-600 mb-2">Salary: ${job.salary}</p>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => setEditingJob(job)}
                      className={`py-2 px-4 rounded-lg shadow-md transition-colors duration-200 ${
                        backgroundClass === "bg-[#F2994A]"
                          ? "bg-white text-[#F2994A] border-2 border-[#F2994A]"
                          : "bg-transparent text-[#F2994A] border-2 border-[#F2994A]"
                      }`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(job)}
                      className={`py-2 px-4 rounded-lg shadow-md transition-colors duration-200 ${
                        backgroundClass === "bg-[#F2994A]"
                          ? "bg-white text-[#F2994A] border-2 border-[#F2994A]"
                          : "bg-transparent text-[#F2994A] border-2 border-[#F2994A]"
                      }`}
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

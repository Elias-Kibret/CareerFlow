import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaDollarSign, FaBriefcase } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link
import useUserStore from "../Store/userStore";

export const AllJobs = () => {
  const { jobs, loading, error, fetchJobs } = useUserStore((state) => ({
    jobs: state.jobs,
    loading: state.loading,
    error: state.error,
    fetchJobs: state.fetchJobs,
  }));

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  if (loading)
    return (
      <div className="text-center text-lg font-medium text-gray-700">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-lg font-medium text-red-600">
        Error: {error}
      </div>
    );

  return (
    <div className="container mx-auto p-8  min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-10 text-center">
        Job Openings
      </h1>
      <div className="flex flex-wrap gap-8 justify-center">
        {jobs.map((job) => (
          <motion.div
            key={job._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white border border-gray-200 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl w-full max-w-md"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FaBriefcase className="text-blue-600" /> {job.title}
              </h2>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-500" /> {job.location}
              </p>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">{job.description}</p>
              <p className="text-gray-600 mb-2 flex items-center gap-2">
                <FaDollarSign className="text-gray-500" /> Salary: ${job.salary}
              </p>
              <div className="flex justify-center">
                <Link to={`/job/${job._id}`}>
                  <button className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md transition-colors duration-200 hover:bg-blue-700">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

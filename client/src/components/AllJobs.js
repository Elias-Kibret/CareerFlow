import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useUserStore from "../Store/userStore";

// Function to randomly decide the background color
const getRandomBackground = () =>
  Math.random() > 0.5 ? "bg-[#F2994A]" : "bg-white";

// Function to truncate text if it exceeds a certain length
const truncateText = (text, length = 300) => {
  return text.length > length ? `${text.substring(0, length)}...` : text;
};

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
    <div className="py-16 px-4">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map((job) => {
          // Determine background color for each card
          const backgroundClass = getRandomBackground();

          return (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.3)",
                transition: { duration: 0.3, ease: "easeInOut" },
              }}
              viewport={{ once: true }}
              className={`flex flex-col items-start p-8 rounded-3xl shadow-lg ${backgroundClass}`}
            >
              <div className="flex flex-col w-full">
                <h3
                  className={`text-xl font-bold mb-2 ${
                    backgroundClass === "bg-[#F2994A]"
                      ? "text-white"
                      : "text-gray-800"
                  }`}
                >
                  {job.title}
                </h3>
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
                <p className={`text-gray-600 mb-2`}>Salary: ${job.salary}</p>
              </div>
              <div className="flex justify-center mt-4">
                <Link to={`/job/${job._id}`}>
                  <button
                    className={`py-2 px-4 rounded-lg shadow-md transition-colors duration-200 ${
                      backgroundClass === "bg-[#F2994A]"
                        ? "bg-white text-[#F2994A] border-2 border-[#F2994A]"
                        : "bg-transparent text-[#F2994A] border-2 border-[#F2994A]"
                    }`}
                  >
                    View Details
                  </button>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

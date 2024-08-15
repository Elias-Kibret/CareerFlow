import React from "react";
import { motion } from "framer-motion";
import manageJobsImage from "./Home/images/Moto.png"; // Replace with your image path

export const ManageJobsInfo = () => {
  return (
    <div className="flex container mx-auto min-h-screen mb-20 items-center justify-between">
      <motion.div
        initial={{ opacity: 0, x: "100vw" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-full md:w-[50%] px-4 flex justify-center"
      >
        <img
          src={manageJobsImage}
          alt="Manage Jobs Illustration"
          className="w-full object-cover rounded-lg"
        />
      </motion.div>
      {/* Text Section */}
      <div className="w-full md:w-[50%] px-4">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900"
        >
          Manage Your <br /> <span className="text-[#F2994A]">Posted Jobs</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="mt-6 mb-12 text-gray-600 text-lg leading-relaxed"
        >
          Keep track of your job postings easily! Manage your posted jobs with
          options to review details and update information. Efficient job
          management is key to staying organized and ensuring your listings are
          up-to-date.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
        >
          <h3 className="font-semibold text-lg text-gray-800">Key Features</h3>
          <motion.ul
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
            className="list-none flex flex-wrap gap-4 mt-4 text-[#F2994A] font-medium"
          >
            <li>Review Posted Jobs</li>
            <li>Update Job Details</li>
            <li>Manage Job Listings</li>
            <li>Track Applications</li>
          </motion.ul>
        </motion.div>
      </div>

      {/* Image Section */}
    </div>
  );
};

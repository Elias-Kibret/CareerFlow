import React from "react";
import { motion } from "framer-motion";
import allMoto from "./Home/images/allMoto.png";

export const AllMoto = () => {
  return (
    <div className="flex container mx-auto  min-h-screen mb-20 items-center justify-between">
      <motion.div
        initial={{ opacity: 0, x: "100vw" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-full md:w-[50%] px-4 flex justify-center"
      >
        <img
          src={allMoto}
          alt="Motivational Illustration"
          className="w-full object-cover rounded-lg "
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
          Discover the <br /> <span className="text-[#F2994A]">Job</span> of
          Your <span className="text-[#F2994A]">Dreams</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="mt-6 mb-12 text-gray-600 text-lg leading-relaxed"
        >
          Find Your New Job Today! Browse through daily updated job postings,
          and apply to the opportunities that align with your career goals. Your
          dream job is just a click away!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
        >
          <h3 className="font-semibold text-lg text-gray-800">
            Trending Job Keywords
          </h3>
          <motion.ul
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
            className="list-none flex flex-wrap gap-4 mt-4 text-[#F2994A] font-medium"
          >
            <li>Web Designer</li>
            <li>UX/UI Designer</li>
            <li>Frontend Developer</li>
            <li>Backend Developer</li>
          </motion.ul>
        </motion.div>
      </div>

      {/* Image Section */}
    </div>
  );
};

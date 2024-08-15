import React from "react";
import { motion } from "framer-motion";

export const Moto = () => {
  return (
    <div className="flex container mx-auto pt-8 min-h-screen mt-40 items-start justify-between">
      <div className="w-[50%]">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-6xl font-bold"
        >
          Find the Job of <br /> your{" "}
          <span className="text-[#F2994A]">Dreams</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="mt-10 mb-20 text-gray-500"
        >
          Find Your New Job Today! New Job Postings
          <br /> Everyday just for you, browse the job you want and apply
          wherever you want
        </motion.p>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
        >
          <h3 className="font-bold">Trending Jobs Keyword</h3>
          <div className="w-[70%]">
            <motion.ul
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
              className="list-none flex justify-between mt-8 text-[#F2994A] font-semibold"
            >
              <li>Web Designer</li>
              <li>UX/UI Designer</li>
              <li>Frontend</li>
              <li>Backend</li>
            </motion.ul>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: "100vw" }} // Start from the right side of the viewport
        animate={{ opacity: 1, x: 0 }} // Slide to the original position
        transition={{ duration: 1.5, ease: "easeOut" }} // Adjust duration and easing as needed
      >
        <img src="./moto.png" alt="Moto" />
      </motion.div>
    </div>
  );
};

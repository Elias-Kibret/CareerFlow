// src/components/JobCreationPage.js
import React from "react";
import { CreateJobForm } from "./CreateJobForm";
import allMoto from "./Home/images/Create.png";
import { Categories } from "./Home/Categories.js";
import { motion } from "framer-motion";

export const JobCreationPage = () => {
  return (
    <div>
      <div className="min-h-screen flex flex-col mt-20 w-[90%] mx-auto">
        <div className="flex flex-1">
          {/* Motto Image */}
          <motion.div
            className="hidden md:flex w-1/2"
            initial={{ opacity: 0, x: -200 }} // Start off-screen to the left
            animate={{ opacity: 1, x: 0 }} // Move to original position
            transition={{ duration: 1, ease: "easeOut" }} // Slide in over 1 second
          >
            <img
              src={allMoto}
              alt="Motto"
              className="object-contain w-full h-full"
            />
          </motion.div>

          {/* Form Container */}
          <motion.div
            className="w-full md:w-1/2 p-8 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }} // Start with opacity 0 and scaled down
            animate={{ opacity: 1, scale: 1 }} // Fade in and scale to full size
            transition={{ duration: 0.8, ease: "easeOut" }} // Animation duration and easing
          >
            <CreateJobForm />
          </motion.div>
        </div>
      </div>
      <Categories />
    </div>
  );
};

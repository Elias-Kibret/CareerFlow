import React from "react";
import { motion } from "framer-motion";
import { SignupForm } from "./SignupForm.js";
import mottoImage from "./Home/images/Moto.png"; // Replace with your actual image path

export const SignupPage = () => {
  return (
    <div className="min-h-screen flex flex-col mt-20 w-[85%] mx-auto">
      {/* Header with Slogan */}
      {/* <header className="mt-10 py-4 text-center">
        <h1 className="text-3xl font-bold">Welcome to CareerPathNow</h1>
        <p className="text-lg mt-2">Your journey to success starts here!</p>
      </header> */}

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Motto Image */}
        <motion.div
          className="hidden md:flex w-1/2"
          initial={{ opacity: 0, x: -200 }} // Start off-screen to the left
          animate={{ opacity: 1, x: 0 }} // Move to original position
          transition={{ duration: 1, ease: "easeOut" }} // Slide in over 1 second
        >
          <img
            src={mottoImage}
            alt="Motto"
            className="object-contain shadow-sm"
          />
        </motion.div>

        {/* Signup Form */}
        <motion.div
          className="w-full md:w-1/2 p-8 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }} // Start with opacity 0 and scaled down
          animate={{ opacity: 1, scale: 1 }} // Fade in and scale to full size
          transition={{ duration: 0.8, ease: "easeOut" }} // Animation duration and easing
        >
          <SignupForm />
        </motion.div>
      </div>
    </div>
  );
};

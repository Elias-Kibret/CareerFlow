import React from "react";
import { motion } from "framer-motion";
import { Login } from "./Login.js";
import mottoImage from "./Home/images/loginMoto3.png";

export const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col mt-20 mx-auto">
      <div className="flex flex-1">
        {/* Login Form */}
        <motion.div
          className="w-full md:w-1/2 p-8 flex items-center justify-center"
          initial={{ opacity: 0, x: 200 }} // Start off-screen to the right
          animate={{ opacity: 1, x: 0 }} // Move to original position
          transition={{ duration: 1, ease: "easeOut" }} // Slide in over 1 second
        >
          <Login />
        </motion.div>

        {/* Motto Image */}
        <motion.div
          className="hidden md:flex w-1/2 p-8 items-center justify-center"
          initial={{ opacity: 0, x: -200 }} // Start off-screen to the left
          animate={{ opacity: 1, x: 0 }} // Move to original position
          transition={{ duration: 1, ease: "easeOut" }} // Slide in over 1 second
        >
          <img
            src={mottoImage}
            alt="Motto"
            className="object-contain w-full h-full rounded-lg shadow-sm" // Added shadow and rounded corners
          />
        </motion.div>
      </div>
    </div>
  );
};

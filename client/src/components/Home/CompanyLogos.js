import React from "react";
import { motion } from "framer-motion";
import airbnb from "./images/airbnb.png";
import microsoft from "./images/microsoft.png";
import google from "./images/google.png";
import slack from "./images/slack.png";
const logos = [slack, microsoft, google, airbnb];

export const CompanyLogos = () => {
  return (
    <div className="bg-white py-16 px-4">
      <div className="container mx-auto text-center">
        <motion.h4
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-2xl font-bold mb-10"
        >
          Join Most Well Known <span className="text-[#F2994A]">Companies</span>{" "}
          Around The World
        </motion.h4>

        <div className="flex flex-wrap justify-between gap-6">
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
              className="w-32 h-32 flex items-center justify-center"
            >
              <img
                src={logo}
                alt={`Company Logo ${index + 1}`}
                className="object-contain h-full w-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

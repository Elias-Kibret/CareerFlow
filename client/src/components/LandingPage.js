import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AllMoto } from "./AllMoto.js";
import V1 from "./Home/images/V1.png"; // Example image imports
import V2 from "./Home/images/V2.png";
import V3 from "./Home/images/V3.png";

const cards = [
  {
    image: V1,
    title: "Post a Job",
    jobsAvailable: 58,
    link: "/create-job",
    buttonText: "Post Job",
  },
  {
    image: V2,
    title: "Manage Listings",
    jobsAvailable: 15,
    link: "/myJobs",
    buttonText: "Manage",
  },
  {
    image: V3,
    title: "Connect with Candidates",
    jobsAvailable: 20,
    link: "/all-jobs",
    buttonText: "Connect",
  },
  // Add more cards as needed
];

export const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <AllMoto />
      {/* How It Works Section */}
      <section className="w-full max-w-6xl mx-auto px-4 py-12 mt-8">
        <h2 className="text-3xl font-bold mt-10 mb-20 ">How It Works</h2>
        <div className="container flex justify-between flex-wrap">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.3)",
                transition: { duration: 0.3, ease: "easeInOut" },
              }} // Enhanced hover animation
              viewport={{ once: true }} // Animation occurs only once
              className={`flex items-center p-8 rounded-3xl shadow-lg ${
                index === 1
                  ? "bg-[#F2994A] text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-12 h-12 object-contain rounded-lg mr-6" // Adjusted image size
              />
              <div className="flex flex-col w-full">
                <h3 className="text-xl font-bold mb-2 whitespace-normal">
                  {card.title}
                </h3>
                <p
                  className={`text-sm ${
                    index === 1 ? "text-white" : "text-gray-700"
                  }`}
                >
                  {card.jobsAvailable} jobs available
                </p>
                <Link
                  to={card.link}
                  className={`mt-4 py-2 px-4 rounded-lg text-sm ${
                    index === 1
                      ? "bg-white text-[#F2994A] hover:bg-gray-100"
                      : "bg-[#F2994A] text-white hover:bg-blue-600"
                  }`}
                >
                  {card.buttonText}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

import React from "react";
import { motion } from "framer-motion";
import V1 from "./images/V1.png";
import V2 from "./images/V2.png";
import V3 from "./images/V3.png";
import V4 from "./images/V4.png";
import V5 from "./images/V5.png";
import V6 from "./images/V6.png";
import V7 from "./images/V7.png";
import V8 from "./images/V8.png";

const cards = [
  { image: V1, title: "Marketing& Communication", jobsAvailable: 58 },
  { image: V2, title: "UI/UX Design", jobsAvailable: 15 },
  { image: V3, title: "Finance Management", jobsAvailable: 20 },
  { image: V4, title: "Web Development", jobsAvailable: 18 },
  { image: V5, title: "Project Management", jobsAvailable: 30 },
  { image: V6, title: "Business& Consulting", jobsAvailable: 12 },
  { image: V7, title: "Graphic Designer", jobsAvailable: 22 },
  { image: V8, title: "Video Editor", jobsAvailable: 28 },
];

// Function to split title into lines based on spaces
const splitTitle = (title) => {
  return title.split(" ").map((word, index) => (
    <React.Fragment key={index}>
      {word}
      <br /> {/* Insert line break after each word */}
    </React.Fragment>
  ));
};

export const Categories = () => {
  return (
    <div className="py-16 px-4">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.3)",
              transition: { duration: 0.3, ease: "easeInOut" },
            }} // Enhanced hover animation
            viewport={{ once: true }} // Animation occurs only once
            className={`flex items-center p-8 rounded-3xl shadow-lg ${
              index === 1 ? "bg-[#F2994A] text-white" : "bg-white text-gray-800"
            }`}
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-12 h-12 object-contain rounded-lg mr-6" // Adjusted image size
            />
            <div className="flex flex-col w-full">
              <h3 className="text-xl font-bold mb-2 whitespace-normal">
                {splitTitle(card.title)}
              </h3>
              <p
                className={`text-sm ${
                  index === 1 ? "text-white" : "text-gray-700"
                }`}
              >
                {card.jobsAvailable} jobs available
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// src/pages/SuccessPage.js
import React from "react";
import { Link } from "react-router-dom";

export const SuccessPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-2xl font-bold mb-4 text-green-700">
          Job Created Successfully!
        </h1>
        <p className="text-gray-600 mb-6">
          Your job listing has been created and is now live. You can return to
          the landing page to create another job or explore other features.
        </p>
        <Link to="/landing" className="text-blue-500 hover:underline">
          Back to Landing Page
        </Link>
      </div>
    </div>
  );
};





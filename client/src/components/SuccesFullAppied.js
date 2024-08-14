import React from "react";
import { useNavigate } from "react-router-dom";

export const SuccesFullAppied = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/"); // Redirect to the homepage or any other route you prefer
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-green-600">
          Application Submitted!
        </h1>
        <p className="mt-4 text-gray-700">
          Your application has been successfully submitted. The employer has
          received your application and will get back to you shortly.
        </p>
        <button
          onClick={handleHomeClick}
          className="mt-6 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

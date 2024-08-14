import React from "react";
import { CreateJobForm } from "./CreateJobForm.js"; // Import the job creation form

const JobFormModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className=" p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 text-2xl"
        >
          &times;
        </button>
        <CreateJobForm />
      </div>
    </div>
  );
};

export default JobFormModal;

import React, { useState } from "react";
import JobFormModal from "./JobFormModal"; // Import the modal component
import { CreateJobForm } from "./CreateJobForm"; // Import the job creation form
import { Link } from "react-router-dom";

export const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-700">
          Welcome to JobPortal
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Your one-stop solution for posting and finding jobs. Whether you're a
          company looking to hire the best talent or a job seeker searching for
          your next opportunity, JobPortal is here to connect you with the right
          people.
        </p>
        <button
          onClick={openModal}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg text-lg hover:bg-blue-600"
        >
          Post a New Job
        </button>
      </section>

      {/* How It Works Section */}
      <section className="w-full max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold text-center mb-6 text-blue-600">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Post a Job
            </h3>
            <p className="text-gray-600 mb-4">
              Easily post your job openings with just a few clicks. Provide
              details about the role, required skills, and company information.
            </p>
            <button
              onClick={openModal}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-600"
            >
              Post a Job
            </button>
          </div>
          {/* Card 2 */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Manage Listings
            </h3>
            <p className="text-gray-600 mb-4">
              Keep track of all your job listings and see which positions are
              filled or still open. Update job details and manage applications
              easily.
            </p>
            <Link
              to="/myJobs"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-600"
            >
              Manage Listings
            </Link>
          </div>
          {/* Card 3 */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Connect with Candidates
            </h3>
            <p className="text-gray-600 mb-4">
              Review applications, schedule interviews, and find the perfect fit
              for your team. Our platform helps streamline your hiring process.
            </p>
            <Link
              to="/allJobs"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-600"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-700 text-white py-4 w-full text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
        </p>
      </footer>

      {/* Job Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
            >
              &times;
            </button>
            <CreateJobForm />
          </div>
        </div>
      )}
    </div>
  );
};

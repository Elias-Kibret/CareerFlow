// src/components/JobCreationPage.js
import React from "react";
import { CreateJobForm } from "./CreateJobForm";

export const JobCreationPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <section className="w-full max-w-6xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-700">
          Create a New Job
        </h1>
        <CreateJobForm />
      </section>
    </div>
  );
};

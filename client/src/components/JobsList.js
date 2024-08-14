import React, { useEffect, useState } from "react";
import useUserStore from "../Store/userStore";
import { UpdateJobForm } from "./UpdateJobForm.js";

export const JobsList = () => {
  const { jobs, loading, error, fetchJobsByEmployer, deleteJob, updateJob } =
    useUserStore((state) => ({
      jobs: state.jobs,
      loading: state.loading,
      error: state.error,
      fetchJobsByEmployer: state.fetchJobsByEmployer,
      deleteJob: state.deleteJob,
      updateJob: state.updateJob,
    }));

  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    fetchJobsByEmployer();
  }, [fetchJobsByEmployer]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  const handleDelete = async (job) => {
    const confirm = window.confirm("Are you sure you want to delete this job?");
    if (confirm) {
      try {
        await deleteJob(job._id);
        alert("Job deleted successfully");
      } catch (error) {
        alert("Failed to delete job");
      }
    }
  };

  const handleUpdate = async (updatedJob) => {
    try {
      const success = await updateJob(updatedJob._id, updatedJob); // Correctly pass jobId and updatedJobData
      if (success) {
        alert("Job updated successfully");
        setEditingJob(null); // Close the form after successful update
      } else {
        alert("Failed to update job");
      }
    } catch (error) {
      alert("Failed to update job");
    }
  };

  const handleCancelUpdate = () => {
    setEditingJob(null); // Close the form without updating
  };

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Jobs Posted by You</h1>
        {editingJob ? (
          <UpdateJobForm
            job={editingJob}
            onUpdate={handleUpdate}
            onCancel={handleCancelUpdate}
          />
        ) : jobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 text-lg">No jobs found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold">{job.title}</h2>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => setEditingJob(job)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(job)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">{job.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-bold text-gray-700">Location:</p>
                      <p className="text-gray-500">{job.location}</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-700">Salary:</p>
                      <p className="text-gray-500">${job.salary}</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-700">Company:</p>
                      <p className="text-gray-500">{job.company}</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-700">Job Type:</p>
                      <p className="text-gray-500">{job.jobType}</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-700">Status:</p>
                      <p className="text-gray-500">{job.status}</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-700">Skills:</p>
                      <p className="text-gray-500">{job.skills.join(", ")}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

import { create } from "zustand";
import axiosInstance from "../axiosInstance.js";

const useUserStore = create((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  error: null,
  jobs: [],
  jobDetails: null,
  jobApplicationStatus: null,
  loading: false,

  // Fetch user profile
  fetchUserProfile: async () => {
    set({ loading: true });
    try {
      const token = get().token;
      const response = await axiosInstance.get("/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        error: null,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch user profile",
        isAuthenticated: false,
        loading: false,
      });
    }
  },

  // User login
  login: async (email, password) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post("/api/user/login", {
        email,
        password,
      });

      const { token } = response.data;
      const { user, role, hasJobs } = response.data.user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      set({ user, token, isAuthenticated: true, error: null, loading: false });

      return { success: true, role, hasJobs };
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to log in",
        isAuthenticated: false,
        loading: false,
      });
      return { success: false, role: null, hasJobs: null };
    }
  },

  // User signup
  signup: async (formData) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post("/api/user/sign-up", formData);
      const { user, token } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      set({ user, token, isAuthenticated: true, error: null, loading: false });
      return { success: true };
    } catch (error) {
      set({
        error: error.response?.data?.message || "Signup failed",
        isAuthenticated: false,
        loading: false,
      });
      return { success: false };
    }
  },

  // Update user profile
  updateProfile: async (updatedData) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.put("/api/user/update", updatedData);
      set({ user: response.data.user, error: null, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to update profile",
        loading: false,
      });
    }
  },

  // Delete user profile
  deleteProfile: async () => {
    set({ loading: true });
    try {
      await axiosInstance.delete("/api/user/delete");
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      set({
        user: null,
        token: null,
        isAuthenticated: false,
        error: null,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete profile",
        loading: false,
      });
    }
  },

  // Logout user
  logout: async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      set({ user: null, token: null, isAuthenticated: false, error: null });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to logout",
      });
    }
  },

  // Fetch jobs for the user
  fetchJobs: async () => {
    set({ loading: true });
    try {
      const token = get().token;
      const response = await axiosInstance.get("/api/jobs/allJobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ jobs: response.data.jobs, error: null, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch jobs",
        loading: false,
      });
    }
  },

  // Fetch details for a specific job
  getJobDetails: async (jobId) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(`/api/jobs/${jobId}`);
      set({ jobDetails: response.data.job, error: null, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch job details",
        loading: false,
      });
    }
  },

  // Apply for a job
  applyForJob: async (jobId, formData) => {
    console.log(formData);
    set({ loading: true });
    try {
      const token = get().token;

      // Create FormData object
      const data = new FormData();
      data.append("userId", formData.userId);
      data.append("jobId", jobId);
      data.append("phoneNumber", formData.phoneNumber);
      data.append("yearsOfExperience", formData.yearsOfExperience);
      data.append("coverLetter", formData.coverLetter);

      if (formData.resume) {
        data.append("resume", formData.resume);
      }

      await axiosInstance.post(`/api/applyJob/apply/${jobId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      set({
        jobApplicationStatus: "Applied successfully",
        error: null,
        loading: false,
      });
    } catch (error) {
      set({
        jobApplicationStatus: null,
        error: error.response?.data?.message || "Failed to apply for job",
        loading: false,
      });
    }
  },
  // Check application status
  checkApplicationStatus: async (jobId) => {
    set({ loading: true });
    try {
      const token = get().token;
      const response = await axiosInstance.get(
        `/api/jobs/application-status/${jobId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      set({
        jobApplicationStatus: response.data.status,
        error: null,
        loading: false,
      });
    } catch (error) {
      set({
        jobApplicationStatus: null,
        error:
          error.response?.data?.message || "Failed to check application status",
        loading: false,
      });
    }
  },
  createJob: async (jobData) => {
    set({ loading: true });
    try {
      const token = get().token;
      console.log("Token in createJob:", token); // Debug log
      if (!token) {
        throw new Error("Token is not available");
      }
      await axiosInstance.post("/api/jobs/create", jobData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ error: null, loading: false });
      return { success: true };
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to create job",
        loading: false,
      });
      return { success: false };
    }
  },
  fetchJobsByEmployer: async () => {
    set({ loading: true });
    try {
      const token = get().token;

      const response = await axiosInstance.get("/api/jobs/by-employer", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ jobs: response.data.jobs, error: null, loading: false });
    } catch (error) {
      console.error("API call error:", error);
      set({
        error: error.response?.data?.message || "Failed to fetch jobs",
        loading: false,
      });
    }
  },
  deleteJob: async (jobId) => {
    set({ loading: true });
    try {
      const token = get().token;
      if (!token) {
        throw new Error("Token is not available");
      }

      // Send DELETE request to the server
      await axiosInstance.delete(`/api/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove the deleted job from the jobs array
      set((state) => ({
        jobs: state.jobs.filter((job) => job._id !== jobId),
        error: null,
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete job",
        loading: false,
      });
    }
  },
  updateJob: async (jobId, updatedJobData) => {
    console.log(updatedJobData);
    set({ loading: true });
    try {
      const token = get().token;
      if (!token) {
        throw new Error("Token is not available");
      }

      const response = await axiosInstance.put(
        `/api/jobs/${jobId}`,
        updatedJobData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update the jobs list with the updated job
      set((state) => ({
        jobs: state.jobs.map((job) =>
          job._id === jobId ? response.data.job : job
        ),
        error: null,
        loading: false,
      }));
      return { success: true };
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to update job",
        loading: false,
      });
      return { success: false };
    }
  },
}));

export default useUserStore;

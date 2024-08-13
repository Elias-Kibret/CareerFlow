import { create } from "zustand";
import axiosInstance from "../axiosInstance.js";

const useUserStore = create((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  error: null,
  jobs: [],
  jobDetails: null, // New state for job details
  jobApplicationStatus: null, // New state for job application status
  loading: false,

  // Fetch user profile
  fetchUserProfile: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/api/users/profile");
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
    set({ loading: true });
    try {
      const token = get().token;
      await axiosInstance.post(`/api/jobs/apply/${jobId}`, formData, {
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
      const response = await axiosInstance.get(`/api/jobs/application-status/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ jobApplicationStatus: response.data.status, error: null, loading: false });
    } catch (error) {
      set({
        jobApplicationStatus: null,
        error: error.response?.data?.message || "Failed to check application status",
        loading: false,
      });
    }
  },
}));

export default useUserStore;

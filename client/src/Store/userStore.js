// src/store/userStore.js

import { create } from "zustand";
import axiosInstance from "../axiosInstance.js"; // Import the Axios instance

const useUserStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  error: null,

  fetchUserProfile: async () => {
    try {
      const response = await axiosInstance.get("/api/users/profile");
      set({ user: response.data.user, isAuthenticated: true, error: null });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch user profile",
        isAuthenticated: false,
      });
    }
  },

  login: async (email, password) => {
    try {
      const response = await axiosInstance.post("/api/user/login", {
        email,
        password,
      });
      set({
        user: response.data.user,
        token: response.data.token,
        isAuthenticated: true,
        error: null, // Reset error on successful login
      });
      return { success: true }; // Return success true on successful login
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to log in",
        isAuthenticated: false,
      });
      return { success: false }; // Return success false on failure
    }
  },

  signup: async (formData) => {
    try {
      const response = await axiosInstance.post("/api/user/sign-up", formData);
      set({
        user: response.data.user,
        token: response.data.token,
        isAuthenticated: true,
        error: null, // Reset error on successful signup
      });
      return { success: true };
    } catch (error) {
      set({
        error: error.response?.data?.message || "Signup failed",
        isAuthenticated: false,
      });
      return { success: false };
    }
  },

  updateProfile: async (updatedData) => {
    try {
      const response = await axiosInstance.put("/api/user/update", updatedData);
      set({ user: response.data.user, error: null });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to update profile",
      });
    }
  },

  deleteProfile: async () => {
    try {
      await axiosInstance.delete("/api/user/delete");
      set({ user: null, token: null, isAuthenticated: false, error: null });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete profile",
      });
    }
  },

  logout: async () => {
    try {
      // You can also call a backend API to invalidate the session if needed
      set({ user: null, token: null, isAuthenticated: false, error: null });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to logout",
      });
    }
  },
}));

export default useUserStore;

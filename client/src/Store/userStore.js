// src/store/userStore.js

import { create } from "zustand";
import axios from "axios";

const useUserStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  error: null,

  fetchUserProfile: async () => {
    try {
      const response = await axios.get("/api/users/profile");
      set({ user: response.data.user, isAuthenticated: true });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch user profile",
      });
    }
  },
  login: async (email, password) => {
    try {
      const response = await axios.post("/api/user/login", { email, password });
      set({
        user: response.data.user,
        token: response.data.token,
        isAuthenticated: true,
      });
    } catch (error) {
      set({ error: error.response?.data?.message || "Failed to log in" });
    }
  },
  signup: async (formData) => {
    try {
      const response = await axios.post("/api/user/signup", formData);
      set({
        user: response.data.user,
        token: response.data.token,
        isAuthenticated: true,
      });
      return { success: true };
    } catch (error) {
      set({ error: error.response?.data?.message || "Signup failed" });
      return { success: false };
    }
  },
  updateProfile: async (updatedData) => {
    try {
      const response = await axios.put("/api/user/update", updatedData);
      set({ user: response.data.user });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to update profile",
      });
    }
  },
  deleteProfile: async () => {
    try {
      await axios.delete("/api/user/delete");
      set({ user: null, token: null, isAuthenticated: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete profile",
      });
    }
  },
}));

export default useUserStore;

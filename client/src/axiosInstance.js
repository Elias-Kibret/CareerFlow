// src/axiosInstance.js

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // Base URL for local server
  timeout: 10000, // Optional: Set a timeout if needed
});

export default axiosInstance;

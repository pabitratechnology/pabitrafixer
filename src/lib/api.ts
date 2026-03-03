import axios from "axios";

const api = axios.create({
  // This will use the VITE_API_URL from your .env file, 
  // or default to "/api" if it's not found.
  baseURL: import.meta.env.VITE_API_URL || "/api", 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
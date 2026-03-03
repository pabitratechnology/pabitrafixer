import axios from "axios";

const api = axios.create({
  // Use a relative path so it works on any domain (Local or Vercel)
  baseURL: "/api", 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
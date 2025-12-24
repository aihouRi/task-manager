import axios from "axios";
import { tokenStorge } from "./token";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config) => {
  const token = tokenStorge.get();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

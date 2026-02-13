import axios from "axios";
import { getItem } from "./storage";

// The base URL for the backend API. In development this should point to your server
// (e.g. "http://localhost:3000" or your machine's local IP if running on a device).
// Expo will substitute values from your environment when you prefix them with
// EXPO_PUBLIC_ (see docs). Previously we had a bogus MySQL connection string here,
// which meant every request went to an invalid URL and login/register would fail.
const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;

// frontend/src/lib/api.ts
import axios from "axios";

// Get the token from localStorage (assuming you store it there after login)
const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Your backend URL
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  },
});

// --- POSTS ---
export const getPostsAPI = () => api.get("/posts");

export const createPostAPI = (formData: FormData) => {
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage

  return api.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};
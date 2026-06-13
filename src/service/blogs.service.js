import axios from "axios";
import { VITE_BACKEND_URL } from "../../config.js";

const API = axios.create({
  baseURL: `${VITE_BACKEND_URL}/blogs`,
});

// GET
export const getBlogs = () => API.get("/");
export const getBlog = (id) => API.get(`/${id}`);
export const getBlogBySlug = (slug) => API.get(`/slug/${slug}`);
// src/service/comment.service.js
import axios from "axios";
import { VITE_BACKEND_URL } from "../../config";

const BASE = `${VITE_BACKEND_URL}/comments`;

/* PUBLIC */
export const submitComment      = (blogId, data) => axios.post(`${BASE}/blog/${blogId}`, data);
export const fetchApprovedComments = (blogId)    => axios.get(`${BASE}/blog/${blogId}/approved`);

/* CMS */
export const getAllComments      = (params = {}) => axios.get(BASE, { params });
export const updateCommentStatus = (id, status) => axios.put(`${BASE}/${id}/status`, { status });
export const deleteComment       = (id)         => axios.delete(`${BASE}/${id}`);
export const bulkUpdateComments  = (ids, status)=> axios.put(`${BASE}/bulk`, { ids, status });
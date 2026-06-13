import axios from 'axios'
import { apiConfig } from '@/config/api.config'

// Create centralized axios instance
const apiClient = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: apiConfig.timeout,
  headers: apiConfig.headers,
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor with error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong'
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
    }
    return Promise.reject(new Error(message))
  }
)

// GET helper
export const get = (url, params = {}) => apiClient.get(url, { params })

// POST helper
export const post = (url, data = {}) => apiClient.post(url, data)

// PUT helper
export const put = (url, data = {}) => apiClient.put(url, data)

// DELETE helper
export const del = (url) => apiClient.delete(url)

export default apiClient

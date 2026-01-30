import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios'
import { getAccessTokenFromLS } from '~/utils/auth'

// Create axios instance for authenticated requests
const http: AxiosInstance = axios.create({
  baseURL: 'https://api.everyorders.com/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor - Add token to headers
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessTokenFromLS()
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Handle errors globally
http.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    // Handle 401 Unauthorized - Token expired or invalid
    if (error.response?.status === 401) {
      // Clear localStorage and redirect to login
      localStorage.removeItem('access_token')
      localStorage.removeItem('profile')
      window.location.href = '/login'
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error('Access forbidden')
    }

    // Handle 500 Server Error
    if (error.response?.status === 500) {
      console.error('Server error')
    }

    return Promise.reject(error)
  }
)

export default http

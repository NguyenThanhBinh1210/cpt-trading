import axios, { AxiosInstance } from 'axios'

// Create axios instance
const authApi: AxiosInstance = axios.create({
  baseURL: 'https://api.everyorders.com/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
authApi.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
authApi.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Types
export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  ok: boolean
  message?: string
  user: {
    id: string
    username: string
    email: string
    name: string
    role: string
    avatar?: string
  }
  token: string
  expires_in?: string
  refreshToken?: string
}

// API functions
export const loginAPI = async (credentials: LoginRequest): Promise<LoginResponse> => {
  console.log('🌐 API Request to:', authApi.defaults.baseURL + '/auth/login')
  console.log('🌐 Request body:', credentials)

  const response = await authApi.post<LoginResponse>('/auth/login', credentials)

  console.log('🌐 API Response status:', response.status)
  console.log('🌐 API Response data:', response.data)

  return response.data
}

export default authApi

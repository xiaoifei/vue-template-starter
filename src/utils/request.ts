import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'

export interface ApiError {
  message: string
  status?: number
}
export const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15_000,
  headers: { Accept: 'application/json' },
})

request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('access_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

request.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const apiError: ApiError = {
      message: error.response?.data?.message ?? error.message ?? 'Request failed',
      status: error.response?.status,
    }
    return Promise.reject(apiError)
  },
)

export default request

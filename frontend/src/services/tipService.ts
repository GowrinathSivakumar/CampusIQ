import axios from 'axios'

const API_URL = 'http://localhost:5000/api/admin/tips'

export interface Tip {
  _id: string
  title: string
  category: string
  description: string
  company: string
  tags: string[]
  status: string
  createdBy?: { name: string; email: string }
}

export interface TipsResponse {
  tips: Tip[]
  total: number
  page: number
  limit: number
}

export interface TipFilters {
  search?: string
  category?: string
  company?: string
  status?: string
  page?: number
  limit?: number
}

export const getTips = async (filters?: TipFilters): Promise<TipsResponse> => {
  const params = new URLSearchParams()
  if (filters?.search) params.append('search', filters.search)
  if (filters?.category) params.append('category', filters.category)
  if (filters?.company) params.append('company', filters.company)
  if (filters?.status) params.append('status', filters.status)
  if (filters?.page) params.append('page', String(filters.page))
  if (filters?.limit) params.append('limit', String(filters.limit))

  const response = await axios.get(`${API_URL}?${params.toString()}`)
  return response.data.data
}

export const getTipById = async (id: string): Promise<Tip> => {
  const response = await axios.get(`${API_URL}/${id}`)
  return response.data.data
}

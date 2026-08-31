import axios from 'axios'
import { mockTips } from '../mocks/mockData'

const API_URL = 'http://localhost:5000/api/admin/tips'

export interface Tip {
  _id: string
  title: string
  category: string
  description: string
  company: string
  tags: string[]
  status: string
  createdAt?: string
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

  try {
    const response = await axios.get(`${API_URL}?${params.toString()}`)
    return response.data.data
  } catch {
    let tips = mockTips
    if (filters?.status) {
      tips = tips.filter((t) => t.status === filters.status)
    }
    if (filters?.category) {
      tips = tips.filter((t) => t.category === filters.category)
    }
    return { tips, total: tips.length, page: filters?.page || 1, limit: filters?.limit || 50 }
  }
}

export const getTipById = async (id: string): Promise<Tip> => {
  const response = await axios.get(`${API_URL}/${id}`)
  return response.data.data
}

export interface CreateTipPayload {
  title: string
  category: string
  description: string
  company?: string
  tags?: string[]
  status?: string
}

export const createTip = async (payload: CreateTipPayload): Promise<Tip> => {
  const response = await axios.post(API_URL, payload)
  return response.data.data
}

export const updateTip = async (id: string, payload: Partial<CreateTipPayload>): Promise<Tip> => {
  const response = await axios.put(`${API_URL}/${id}`, payload)
  return response.data.data
}

export const deleteTip = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`)
}

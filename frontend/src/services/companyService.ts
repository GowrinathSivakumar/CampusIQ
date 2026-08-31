import axios from 'axios'
import { mockCompanies } from '../mocks/mockData'

const API_URL = 'http://localhost:5000/api/admin/companies'

export interface Company {
  _id: string
  name: string
  type: string
  industry: string
  logo?: string | null
  website?: string
  location?: string
  description?: string
  package?: number | string
  status: string
  tags?: string[]
  eligibility?: string[]
  process?: string[]
  rounds?: { name: string; description: string; duration: string }[]
  tips?: string[]
  resources?: { title: string; url: string }[]
  createdAt?: string
}

export interface CompaniesResponse {
  companies: Company[]
  total: number
  page: number
  limit: number
}

export interface CompanyFilters {
  search?: string
  industry?: string
  status?: string
  page?: number
  limit?: number
}

export const getCompanies = async (filters?: CompanyFilters): Promise<CompaniesResponse> => {
  const params = new URLSearchParams()
  if (filters?.search) params.append('search', filters.search)
  if (filters?.industry) params.append('industry', filters.industry)
  if (filters?.status) params.append('status', filters.status)
  if (filters?.page) params.append('page', String(filters.page))
  if (filters?.limit) params.append('limit', String(filters.limit))

  try {
    const response = await axios.get(`${API_URL}?${params.toString()}`)
    return response.data.data
  } catch {
    let companies = mockCompanies
    if (filters?.search) {
      const q = filters.search.toLowerCase()
      companies = companies.filter((c) => c.name.toLowerCase().includes(q) || c.industry.toLowerCase().includes(q))
    }
    if (filters?.industry) {
      companies = companies.filter((c) => c.industry === filters.industry)
    }
    if (filters?.status) {
      companies = companies.filter((c) => c.status === filters.status)
    }
    return { companies, total: companies.length, page: filters?.page || 1, limit: filters?.limit || 200 }
  }
}

export const getCompanyById = async (id: string): Promise<Company> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data.data
  } catch {
    const company = mockCompanies.find((c) => c._id === id)
    if (company) return company
    throw new Error('Company not found in mock data')
  }
}

export interface CreateCompanyPayload {
  name: string
  type?: string
  industry: string
  logo?: string | null
  website?: string
  location?: string
  description?: string
  package?: number
  status?: string
  tags?: string[]
  eligibility?: string[]
  process?: string[]
  rounds?: { name: string; description: string; duration: string }[]
  tips?: string[]
  resources?: { title: string; url: string }[]
}

export const createCompany = async (payload: CreateCompanyPayload): Promise<Company> => {
  const response = await axios.post(API_URL, payload)
  return response.data.data
}

export const updateCompany = async (id: string, payload: Partial<CreateCompanyPayload>): Promise<Company> => {
  const response = await axios.put(`${API_URL}/${id}`, payload)
  return response.data.data
}

export const deleteCompany = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`)
}

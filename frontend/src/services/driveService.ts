import axios from 'axios'

const API_URL = 'http://localhost:5000/api/admin/drives'

export interface Drive {
  _id: string
  company?: { _id: string; name: string; logo?: string }
  companyName: string
  role: string
  date: string
  studentsPlaced: number
  package: string
  rounds: number
  department: string
  description: string
  createdBy?: { name: string; email: string }
}

export interface DrivesResponse {
  drives: Drive[]
  total: number
  page: number
  limit: number
}

export interface DriveFilters {
  search?: string
  company?: string
  year?: string
  department?: string
  page?: number
  limit?: number
}

export const getDrives = async (filters?: DriveFilters): Promise<DrivesResponse> => {
  const params = new URLSearchParams()
  if (filters?.search) params.append('search', filters.search)
  if (filters?.company) params.append('company', filters.company)
  if (filters?.year) params.append('year', filters.year)
  if (filters?.department) params.append('department', filters.department)
  if (filters?.page) params.append('page', String(filters.page))
  if (filters?.limit) params.append('limit', String(filters.limit))

  const response = await axios.get(`${API_URL}?${params.toString()}`)
  return response.data.data
}

export const getDriveById = async (id: string): Promise<Drive> => {
  const response = await axios.get(`${API_URL}/${id}`)
  return response.data.data
}

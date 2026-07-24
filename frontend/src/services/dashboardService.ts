import axios from 'axios'

const API_URL = 'http://localhost:5000/api/admin/dashboard'

export interface DashboardStats {
  totalCompanies: number
  totalDrives: number
  totalQuestions: number
  totalTips: number
  totalStudents: number
}

export interface HighestPlacement {
  _id: string
  companyName: string
  role: string
  package: string
  date: string
  company?: { _id: string; name: string; logo?: string }
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await axios.get(`${API_URL}/stats`)
  return response.data.data
}

export const getHighestPlacement = async (): Promise<HighestPlacement | null> => {
  const response = await axios.get(`${API_URL}/highest-placement`)
  return response.data.data
}

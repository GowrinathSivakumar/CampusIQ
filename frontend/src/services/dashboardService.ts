import axios from 'axios'
import { mockDashboard } from '../mocks/mockData'

const API_URL = 'http://localhost:5000/api/admin/dashboard'

export interface DashboardStats {
  totalCompanies: number
  totalDrives: number
  totalQuestions: number
  totalTips: number
  totalStudents: number
  totalBookmarks: number
  activeCompanies: number
  inactiveCompanies: number
  publishedTips: number
  drivesThisYear: number
  totalStudentsPlaced: number
}

export interface HighestPlacement {
  _id: string
  companyName: string
  role: string
  package: string
  date: string
  company?: { _id: string; name: string; logo?: string }
}

export interface RecentDrive {
  _id: string
  companyName: string
  role: string
  date: string
  studentsPlaced: number
  package: string
  company?: { _id: string; name: string; logo?: string }
}

export interface PlacementStat {
  _id: string
  totalDrives: number
  totalPlaced: number
}

export interface DashboardResponse {
  stats: DashboardStats
  highestPlacement: HighestPlacement | null
  recentDrives: RecentDrive[]
  placementStats: PlacementStat[]
}

export const getDashboard = async (): Promise<DashboardResponse> => {
  try {
    const response = await axios.get(API_URL)
    return response.data.data
  } catch {
    return mockDashboard
  }
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const response = await axios.get(`${API_URL}/stats`)
    return response.data.data
  } catch {
    return mockDashboard.stats
  }
}

export const getHighestPlacement = async (): Promise<HighestPlacement | null> => {
  try {
    const response = await axios.get(`${API_URL}/highest-placement`)
    return response.data.data
  } catch {
    return mockDashboard.highestPlacement
  }
}

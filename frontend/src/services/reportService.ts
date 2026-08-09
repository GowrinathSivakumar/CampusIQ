import axios from 'axios'

const API_URL = 'http://localhost:5000/api/admin/reports'

export interface ReportSummary {
  totalPlacements: number
  activeStudents: number
  avgPackage: number
  placementRate: number
  change: {
    placements: number
    students: number
    avgPackage: number
    placementRate: number
  }
}

export interface YearlyTrend {
  year: number
  drives: number
  placed: number
}

export interface CompanyStat {
  company: string
  drives: number
  placed: number
}

export interface DepartmentStat {
  department: string
  drives: number
  placed: number
}

export const getReportSummary = async (): Promise<ReportSummary> => {
  const response = await axios.get(`${API_URL}/summary`)
  return response.data.data
}

export const getYearlyTrends = async (): Promise<YearlyTrend[]> => {
  const response = await axios.get(`${API_URL}/yearly-trends`)
  return response.data.data
}

export const getCompanyWise = async (): Promise<CompanyStat[]> => {
  const response = await axios.get(`${API_URL}/company-wise`)
  return response.data.data
}

export const getDepartmentWise = async (): Promise<DepartmentStat[]> => {
  const response = await axios.get(`${API_URL}/department-wise`)
  return response.data.data
}

export const exportReport = async (): Promise<Blob> => {
  const response = await axios.get(`${API_URL}/export`, { responseType: 'blob' })
  return response.data
}

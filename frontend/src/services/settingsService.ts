import axios from 'axios'
import { mockPreferences } from '../mocks/mockData'

const API_URL = 'http://localhost:5000/api/admin/auth'

export interface UserProfile {
  id: string
  name: string
  email: string
  role: string
}

export interface Preferences {
  emailNotifications: boolean
  autoPublish: boolean
  analyticsTracking: boolean
  theme: 'light' | 'dark' | 'system'
  notificationPrefs: boolean
  privacy: boolean
}

export const getProfile = async (): Promise<UserProfile> => {
  const response = await axios.get(`${API_URL}/me`)
  return response.data.data
}

export const updateProfile = async (payload: { name?: string; email?: string }): Promise<UserProfile> => {
  const response = await axios.put(`${API_URL}/settings`, payload)
  return response.data.data
}

export const changePassword = async (payload: {
  currentPassword: string
  newPassword: string
}): Promise<void> => {
  await axios.put(`${API_URL}/password`, payload)
}

export const getPreferences = async (): Promise<Preferences> => {
  try {
    const response = await axios.get(`${API_URL}/preferences`)
    return response.data.data
  } catch {
    return mockPreferences
  }
}

export const updatePreferences = async (payload: Partial<Preferences>): Promise<Preferences> => {
  const response = await axios.put(`${API_URL}/preferences`, payload)
  return response.data.data
}

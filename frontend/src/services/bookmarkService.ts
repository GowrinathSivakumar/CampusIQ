import axios from 'axios'
import { mockBookmarks } from '../mocks/mockData'

const API_URL = 'http://localhost:5000/api/admin/bookmarks'

export interface BookmarkCompany {
  _id: string
  name: string
  industry?: string
  location?: string
  package?: string
  status?: string
}

export interface BookmarkQuestion {
  _id: string
  question: string
  category?: string
  company?: string
  difficulty?: string
}

export interface Bookmark {
  _id: string
  user: string
  itemType: 'company' | 'question' | 'guide'
  companyId?: BookmarkCompany
  questionId?: BookmarkQuestion
  guideTitle?: string
  guideType?: string
  createdAt: string
}

export interface BookmarksResponse {
  bookmarks: Bookmark[]
  total: number
  page: number
  limit: number
}

export interface BookmarkFilters {
  type?: string
  page?: number
  limit?: number
}

export const getBookmarks = async (filters?: BookmarkFilters): Promise<BookmarksResponse> => {
  const params = new URLSearchParams()
  if (filters?.type && filters.type !== 'all') params.append('type', filters.type)
  if (filters?.page) params.append('page', String(filters.page))
  if (filters?.limit) params.append('limit', String(filters.limit))

  try {
    const response = await axios.get(`${API_URL}?${params.toString()}`)
    return response.data.data
  } catch {
    let bookmarks = mockBookmarks
    if (filters?.type && filters.type !== 'all') {
      bookmarks = bookmarks.filter((b) => b.itemType === filters.type)
    }
    return { bookmarks, total: bookmarks.length, page: filters?.page || 1, limit: filters?.limit || 200 }
  }
}

export const addBookmark = async (bookmark: {
  itemType: string
  companyId?: string
  questionId?: string
  guideTitle?: string
  guideType?: string
}): Promise<Bookmark> => {
  const response = await axios.post(API_URL, bookmark)
  return response.data.data
}

export const removeBookmark = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`)
}

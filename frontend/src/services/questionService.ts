import axios from 'axios'

const API_URL = 'http://localhost:5000/api/admin/questions'

export interface Question {
  _id: string
  question: string
  category: string
  company: string
  difficulty: string
  answer: string
  tags: string[]
  createdBy?: { name: string; email: string }
}

export interface QuestionsResponse {
  questions: Question[]
  total: number
  page: number
  limit: number
}

export interface QuestionFilters {
  search?: string
  category?: string
  company?: string
  difficulty?: string
  page?: number
  limit?: number
}

export const getQuestions = async (filters?: QuestionFilters): Promise<QuestionsResponse> => {
  const params = new URLSearchParams()
  if (filters?.search) params.append('search', filters.search)
  if (filters?.category) params.append('category', filters.category)
  if (filters?.company) params.append('company', filters.company)
  if (filters?.difficulty) params.append('difficulty', filters.difficulty)
  if (filters?.page) params.append('page', String(filters.page))
  if (filters?.limit) params.append('limit', String(filters.limit))

  const response = await axios.get(`${API_URL}?${params.toString()}`)
  return response.data.data
}

export const getQuestionById = async (id: string): Promise<Question> => {
  const response = await axios.get(`${API_URL}/${id}`)
  return response.data.data
}

export interface CreateQuestionPayload {
  question: string
  category: string
  company?: string
  difficulty?: string
  answer?: string
  tags?: string[]
}

export const createQuestion = async (payload: CreateQuestionPayload): Promise<Question> => {
  const response = await axios.post(API_URL, payload)
  return response.data.data
}

export const updateQuestion = async (id: string, payload: Partial<CreateQuestionPayload>): Promise<Question> => {
  const response = await axios.put(`${API_URL}/${id}`, payload)
  return response.data.data
}

export const deleteQuestion = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`)
}

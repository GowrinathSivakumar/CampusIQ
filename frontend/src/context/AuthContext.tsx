import { createContext, useContext, useState, type ReactNode } from 'react'

interface User {
  email: string
  role: 'student' | 'admin'
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, role: 'student' | 'admin') => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const BYPASS_AUTH = true

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = (email: string, role: 'student' | 'admin') => {
    setUser({ email, role })
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: BYPASS_AUTH || user !== null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react'

type User = {
  username: string
  tipo: string // 'A' ou 'U'
}

type AuthContextType = {
  user: User | null
  token: string | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const API_URL = 'http://localhost:3000'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  })
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'))

  async function login(username: string, password: string) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        console.error('Login failed:', errorData?.message || response.statusText)
        return false
      }

      const data = await response.json()
      // Supondo que a API retorna { user: { ... }, token: '...' }
     setUser({ username, tipo: data.tipo })
      localStorage.setItem('user', JSON.stringify({ username, tipo: data.tipo }))
      setToken(data.token)
      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  function logout() {
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user))
    else localStorage.removeItem('user')
    if (token) localStorage.setItem('token', token)
    else localStorage.removeItem('token')
  }, [user, token])

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
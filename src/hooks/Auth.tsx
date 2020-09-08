import React, { createContext, useCallback, useState, useContext } from 'react'
import api from '../services/api';

interface SingInCredentials {
  email: string
  password: string
}

interface AuthContextData {
  user: object
  signIn(credentials: SingInCredentials): Promise<void>
  signOut(): void
}

interface AuthState {
  token: string
  user: object
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)


export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem('@gobarber:user')
    const token = localStorage.getItem('@gobarber:token')

    if (token && user) {
      return { token, user: JSON.parse(user) }
    }

    return {} as AuthState
  })

  const signIn = useCallback(async ({ email, password }) => {
    console.log('signIn');
    const { data: { user, token } } = await api.post('/sessions', { email, password })
    localStorage.setItem('@gobarber:user', JSON.stringify(user))
    localStorage.setItem('@gobarber:token', token)
    setData({ user, token })
  }, [])
  const signOut = useCallback(() => {
    localStorage.removeItem('@gobarber:user')
    localStorage.removeItem('@gobarber:token')
    setData({} as AuthState)
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

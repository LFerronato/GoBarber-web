import React, { createContext, useCallback, useState, useContext } from 'react'
import { v4 } from 'uuid'

import ToastContainer from '../components/ToastContainer';

interface ToastContextData {
  addToast(message: Omit<ToastMessages, 'id'>): void
  removeToast(id: string): void
}
export interface ToastMessages {
  id: string
  type?: 'success' | 'error' | 'info'
  title: string
  description?: string
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData)

export const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessages[]>([])

  const addToast = useCallback(({ type, title, description }: Omit<ToastMessages, 'id'>) => {
    const id = v4()
    setMessages(oldMessages => [
      ...oldMessages,
      { id, type, title, description }
    ])
  }, [])

  const removeToast = useCallback((id: string) => {
    setMessages(oldMessages => oldMessages.filter(message => message.id !== id))
  }, [])
  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextData {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within an ToastProvider')
  }

  return context
}

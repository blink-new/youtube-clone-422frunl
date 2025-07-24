import { useState, useEffect } from 'react'
import { blink } from '../blink/client'

interface User {
  id: string
  email: string
  displayName?: string
  avatar?: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false
  })

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setAuthState({
        user: state.user,
        isLoading: state.isLoading,
        isAuthenticated: state.isAuthenticated
      })
    })

    return unsubscribe
  }, [])

  const login = () => {
    blink.auth.login()
  }

  const logout = () => {
    blink.auth.logout()
  }

  const updateProfile = async (data: { displayName?: string; avatar?: string }) => {
    try {
      await blink.auth.updateMe(data)
      return true
    } catch (error) {
      console.error('Failed to update profile:', error)
      return false
    }
  }

  return {
    ...authState,
    login,
    logout,
    updateProfile
  }
}
import { createContext, useContext, useState, useEffect } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../services/firebase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mockMode, setMockMode] = useState(false)

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        setUser(firebaseUser)
        setLoading(false)
      })
      return unsubscribe
    } catch (e) {
      console.warn('Firebase Auth not available, using mock mode')
      setMockMode(true)
      // Create a mock user for testing
      setUser({ uid: 'mock-user', email: 'demo@mecoia.app', getIdToken: async () => 'mock-token' })
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    if (mockMode) {
      setUser({ uid: 'mock-user', email, getIdToken: async () => 'mock-token' })
      return
    }
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signup = async (email, password) => {
    if (mockMode) {
      setUser({ uid: 'mock-user', email, getIdToken: async () => 'mock-token' })
      return
    }
    await createUserWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    if (mockMode) {
      setUser(null)
      return
    }
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, loading, mockMode, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
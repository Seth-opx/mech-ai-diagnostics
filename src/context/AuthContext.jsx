import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

const MOCK_USER = {
  uid: 'mock-user',
  email: 'demo@mecoia.app',
  displayName: 'Démo Méco-IA',
  getIdToken: async () => 'mock-token'
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mockMode, setMockMode] = useState(true)

  useEffect(() => {
    let cancelled = false
    let unsubscribe = null

    async function init() {
      if (import.meta.env.VITE_FORCE_MOCK === 'true') {
        if (!cancelled) {
          setMockMode(true)
          setUser(MOCK_USER)
          setLoading(false)
        }
        return
      }

      try {
        const firebase = await import('../services/firebase.js')
        const { onAuthStateChanged } = await import('firebase/auth')
        const auth = await firebase.getAuthInstance()

        if (!auth) throw new Error('Firebase non configuré')

        unsubscribe = onAuthStateChanged(auth, firebaseUser => {
          if (cancelled) return
          setUser(firebaseUser || null)
          setMockMode(false)
          setLoading(false)
        })
      } catch (error) {
        console.warn('Mode démo activé:', error?.message)
        if (!cancelled) {
          setMockMode(true)
          setUser(MOCK_USER)
          setLoading(false)
        }
      }
    }

    init()

    return () => {
      cancelled = true
      if (typeof unsubscribe === 'function') unsubscribe()
    }
  }, [])

  async function login(email, password) {
    if (mockMode) {
      setUser({ ...MOCK_USER, email: email || MOCK_USER.email })
      return
    }

    const { signInWithEmailAndPassword } = await import('firebase/auth')
    const { getAuthInstance } = await import('../services/firebase.js')
    const auth = await getAuthInstance()
    await signInWithEmailAndPassword(auth, email, password)
  }

  async function signup(email, password) {
    if (mockMode) {
      setUser({ ...MOCK_USER, email: email || MOCK_USER.email })
      return
    }

    const { createUserWithEmailAndPassword } = await import('firebase/auth')
    const { getAuthInstance } = await import('../services/firebase.js')
    const auth = await getAuthInstance()
    await createUserWithEmailAndPassword(auth, email, password)
  }

  async function logout() {
    if (mockMode) {
      setUser(null)
      return
    }

    const { signOut } = await import('firebase/auth')
    const { getAuthInstance } = await import('../services/firebase.js')
    const auth = await getAuthInstance()
    await signOut(auth)
  }

  const value = useMemo(
    () => ({ user, loading, mockMode, login, signup, logout }),
    [user, loading, mockMode]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth doit être utilisé dans AuthProvider')
  return context
}

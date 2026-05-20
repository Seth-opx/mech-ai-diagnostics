import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

const MOCK_USER = {
  uid: 'mock-user',
  email: 'demo@mecoia.app',
  displayName: 'Démo Méco-IA',
  getIdToken: async () => 'mock-token'
}

function withTimeout(promise, ms = 2500) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout initialisation Firebase')), ms))
  ])
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mockMode, setMockMode] = useState(true)

  useEffect(() => {
    let cancelled = false
    let unsubscribe = null

    async function activateMock(reason) {
      console.warn('Mode démo activé:', reason?.message || reason || 'Firebase non configuré')
      if (cancelled) return
      setMockMode(true)
      setUser(MOCK_USER)
      setLoading(false)
    }

    async function init() {
      if (import.meta.env.VITE_FORCE_MOCK === 'true') {
        await activateMock('VITE_FORCE_MOCK=true')
        return
      }

      try {
        const [{ onAuthStateChanged }, firebase] = await withTimeout(Promise.all([
          import('firebase/auth'),
          import('../services/firebase.js')
        ]))

        const auth = await withTimeout(firebase.getAuthInstance())
        if (!auth) {
          await activateMock('Firebase env manquant')
          return
        }

        unsubscribe = onAuthStateChanged(
          auth,
          firebaseUser => {
            if (cancelled) return
            setUser(firebaseUser || MOCK_USER)
            setMockMode(!firebaseUser)
            setLoading(false)
          },
          error => activateMock(error)
        )
      } catch (error) {
        await activateMock(error)
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

import { createContext, useContext, useMemo, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [credits, setCredits] = useState(2)
  const [isPremium, setIsPremium] = useState(false)
  const [history, setHistory] = useState([])
  const [currentDiagnosis, setCurrentDiagnosis] = useState(null)
  const [lastCapture, setLastCapture] = useState(null)

  function consumeCredit() {
    if (isPremium) return true
    if (credits <= 0) return false
    setCredits(prev => Math.max(0, prev - 1))
    return true
  }

  function addCredits(amount) {
    setCredits(prev => prev + amount)
  }

  function addToHistory(diagnosis) {
    const item = {
      id: crypto?.randomUUID?.() || String(Date.now()),
      date: new Date().toISOString(),
      ...diagnosis
    }
    setHistory(prev => [item, ...prev])
    setCurrentDiagnosis(item)
    return item
  }

  const value = useMemo(
    () => ({
      credits,
      setCredits,
      addCredits,
      consumeCredit,
      isPremium,
      setIsPremium,
      history,
      addToHistory,
      currentDiagnosis,
      setCurrentDiagnosis,
      lastCapture,
      setLastCapture
    }),
    [credits, isPremium, history, currentDiagnosis, lastCapture]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp doit être utilisé dans AppProvider')
  return context
}

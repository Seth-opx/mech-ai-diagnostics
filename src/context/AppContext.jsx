import { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [credits, setCredits] = useState(2)
  const [isPremium, setIsPremium] = useState(false)
  const [history, setHistory] = useState([])

  const addToHistory = (diagnosis) => {
    setHistory(prev => [{
      id: Date.now(),
      date: new Date().toISOString(),
      ...diagnosis
    }, ...prev])
  }

  return (
    <AppContext.Provider value={{ credits, setCredits, isPremium, setIsPremium, history, addToHistory }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
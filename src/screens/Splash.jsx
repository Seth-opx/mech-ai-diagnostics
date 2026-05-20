import { useEffect } from 'react'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import { SCREENS } from '../utils/constants.js'

export default function Splash({ navigate }) {
  useEffect(() => {
    const timer = setTimeout(() => navigate(SCREENS.DASHBOARD), 900)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="center-screen">
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: 8 }}>Méco-IA</h1>
        <p>Diagnostic automobile intelligent</p>
        <LoadingSpinner label="Initialisation..." />
      </div>
    </div>
  )
}

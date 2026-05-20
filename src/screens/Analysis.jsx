import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { ErrorMessage } from '../components/ErrorMessage'
import { diagnoseImage } from '../services/diagnoseApi'
import { useAuth } from '../context/AuthContext'
import { useApp } from '../context/AppContext'

export default function Analysis() {
  const { state } = useLocation()
  const { file, vehicleType, symptoms } = state || {}
  const { user } = useAuth()
  const { addToHistory } = useApp()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  useEffect(() => {
    if (!file) {
      navigate('/capture')
      return
    }

    const runDiagnosis = async () => {
      try {
        const result = await diagnoseImage({ file, vehicleType, symptoms, user })
        addToHistory(result)
        navigate('/result', { state: { diagnosis: result } })
      } catch (e) {
        setError(e.message)
      }
    }

    const timer = setTimeout(runDiagnosis, 2000)
    return () => clearTimeout(timer)
  }, [file, vehicleType, symptoms, user])

  return (
    <div className="screen" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔍</div>
        <h2 style={{ marginBottom: '8px' }}>Analyse en cours...</h2>
        <p style={{ color: 'var(--text-muted)' }}>L'IA examine votre image</p>
        <LoadingSpinner message="" />
      </div>
      {error && <ErrorMessage message={error} />}
    </div>
  )
}
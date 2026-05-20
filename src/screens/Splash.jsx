import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Splash() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loading) {
        navigate(user ? '/dashboard' : '/login')
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [user, loading, navigate])

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--primary)' }}>
      <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔧</div>
      <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Méco-IA</h1>
      <p style={{ color: 'var(--text-muted)' }}>Diagnostic intelligent pour auto & moto</p>
      <div className="spinner" style={{ marginTop: '40px' }} />
    </div>
  )
}
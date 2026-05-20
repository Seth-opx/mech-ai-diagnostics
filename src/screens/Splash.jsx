import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Splash() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Skip splash if already on a valid route
    if (location.pathname === '/debug') return

    const timer = setTimeout(() => {
      if (!loading) {
        navigate(user ? '/dashboard' : '/login')
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [user, loading, navigate])

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#1a1a2e',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔧</div>
      <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Méco-IA</h1>
      <p style={{ color: '#a0a0b0' }}>Diagnostic intelligent pour auto & moto</p>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid #2a2a40',
        borderTopColor: '#e94560',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
        marginTop: '40px'
      }} />
      <p style={{ marginTop: '20px', fontSize: '0.85rem', color: '#a0a0b0' }}>
        Chargement...
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
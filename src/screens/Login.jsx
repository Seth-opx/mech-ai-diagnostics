import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const { mockMode, login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!email || !password) return
    setLoading(true)
    setError('')
    try {
      if (mockMode) {
        // Mock mode: bypass Firebase, go to dashboard
        await login(email, password)
        navigate('/dashboard')
      } else {
        if (isSignUp) {
          const { createUserWithEmailAndPassword } = await import('firebase/auth')
          const { auth } = await import('../services/firebase')
          await createUserWithEmailAndPassword(auth, email, password)
        } else {
          const { signInWithEmailAndPassword } = await import('firebase/auth')
          const { auth } = await import('../services/firebase')
          await signInWithEmailAndPassword(auth, email, password)
        }
      }
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1a1a2e',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔧</div>
        <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Méco-IA</h1>
        <p style={{ color: '#a0a0b0', marginTop: '8px' }}>
          {mockMode ? '🎭 Mode Mock — Test local' : 'Connexion à votre compte'}
        </p>
      </div>

      {error && (
        <div style={{
          background: 'rgba(248,113,113,0.1)',
          border: '1px solid #f87171',
          color: '#f87171',
          padding: '12px 16px',
          borderRadius: '10px',
          marginBottom: '16px',
          fontSize: '0.9rem'
        }}>
          {error}
        </div>
      )}

      <div style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{
            width: '100%',
            background: '#16213e',
            border: '1px solid #2a2a40',
            color: 'white',
            padding: '14px 16px',
            borderRadius: '10px',
            fontSize: '1rem',
            marginBottom: '12px'
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{
            width: '100%',
            background: '#16213e',
            border: '1px solid #2a2a40',
            color: 'white',
            padding: '14px 16px',
            borderRadius: '10px',
            fontSize: '1rem',
            marginBottom: '20px'
          }}
        />

        <button
          onClick={handleSubmit}
          disabled={loading || !email || !password}
          style={{
            background: loading ? '#a0a0b0' : '#e94560',
            color: 'white',
            border: 'none',
            padding: '14px 24px',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            width: '100%',
            marginBottom: '16px'
          }}
        >
          {loading ? 'Chargement...' : isSignUp ? 'Créer un compte' : 'Se connecter'}
        </button>

        {mockMode && (
          <button
            onClick={() => navigate('/debug')}
            style={{
              background: 'transparent',
              border: '1px solid #2a2a40',
              color: '#a0a0b0',
              padding: '10px',
              borderRadius: '10px',
              cursor: 'pointer',
              width: '100%',
              fontSize: '0.85rem',
              marginBottom: '12px'
            }}
          >
            🧪 Accéder au Debug Screen
          </button>
        )}

        <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#a0a0b0' }}>
          {isSignUp ? 'Déjà un compte ?' : 'Pas de compte ?'}{' '}
          <span
            onClick={() => setIsSignUp(!isSignUp)}
            style={{ color: '#e94560', cursor: 'pointer' }}
          >
            {isSignUp ? 'Se connecter' : 'Créer un compte'}
          </span>
        </p>
      </div>
    </div>
  )
}
import { useNavigate } from 'react-router-dom'

export default function Debug() {
  const navigate = useNavigate()

  const mockMode = import.meta.env.VITE_USE_MOCK_AI === 'true' || !import.meta.env.VITE_USE_MOCK_AI

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1a1a2e',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔧</div>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Méco-IA</h1>
      <p style={{ color: '#a0a0b0', marginBottom: '24px' }}>Debug Screen</p>

      <div style={{
        background: '#1e1e30',
        border: '1px solid #2a2a40',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px',
        width: '100%',
        maxWidth: '320px'
      }}>
        <div style={{ marginBottom: '12px' }}>
          <span style={{ color: '#a0a0b0' }}>Version: </span>
          <span style={{ color: '#4ade80' }}>1.0.0-debug</span>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <span style={{ color: '#a0a0b0' }}>Mode: </span>
          <span style={{ color: mockMode ? '#fbbf24' : '#4ade80' }}>
            {mockMode ? 'MOCK' : 'PRODUCTION'}
          </span>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <span style={{ color: '#a0a0b0' }}>Firebase: </span>
          <span style={{ color: '#4ade80' }}>placeholder</span>
        </div>
        <div>
          <span style={{ color: '#a0a0b0' }}>Platform: </span>
          <span style={{ color: '#4ade80' }}>Android/Capacitor</span>
        </div>
      </div>

      <button
        onClick={() => navigate('/dashboard')}
        style={{
          background: '#e94560',
          color: 'white',
          border: 'none',
          padding: '14px 28px',
          borderRadius: '12px',
          fontSize: '1rem',
          fontWeight: 600,
          cursor: 'pointer',
          width: '100%',
          maxWidth: '320px'
        }}
      >
        🚀 Entrer dans l'app
      </button>

      <p style={{ marginTop: '20px', fontSize: '0.8rem', color: '#a0a0b0' }}>
        Si vous voyez cet écran, React fonctionne correctement.
      </p>
    </div>
  )
}
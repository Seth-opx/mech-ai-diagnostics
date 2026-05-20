import { useNavigate, useLocation } from 'react-router-dom'

const tabs = [
  { path: '/', label: 'Accueil', icon: '🏠' },
  { path: '/history', label: 'Historique', icon: '📋' },
  { path: '/profile', label: 'Profil', icon: '👤' },
]

export function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: 'var(--card-bg)', borderTop: '1px solid var(--border)',
      display: 'flex', justifyContent: 'space-around', padding: '8px 0'
    }}>
      {tabs.map(tab => (
        <button
          key={tab.path}
          onClick={() => navigate(tab.path)}
          style={{
            background: 'none', border: 'none', color: location.pathname === tab.path ? 'var(--accent)' : 'var(--text-muted)',
            fontSize: '0.8rem', padding: '8px 16px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px'
          }}
        >
          <span style={{ fontSize: '1.4rem' }}>{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
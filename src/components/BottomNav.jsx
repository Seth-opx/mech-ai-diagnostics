import { SCREENS } from '../utils/constants.js'

const items = [
  { screen: SCREENS.DASHBOARD, label: 'Accueil' },
  { screen: SCREENS.HISTORY, label: 'Historique' },
  { screen: SCREENS.CHAT, label: 'Chat' },
  { screen: SCREENS.GARAGES, label: 'Garages' },
  { screen: SCREENS.PROFILE, label: 'Profil' }
]

export default function BottomNav({ current, navigate }) {
  return (
    <nav style={{
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 10,
      background: 'rgba(22, 33, 62, 0.96)',
      borderTop: '1px solid var(--border)',
      padding: '8px 8px env(safe-area-inset-bottom)',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div style={{ display: 'flex', width: '100%', maxWidth: 520, gap: 6 }}>
        {items.map(item => (
          <button
            key={item.screen}
            onClick={() => navigate(item.screen)}
            style={{
              flex: 1,
              border: 'none',
              background: current === item.screen ? 'var(--accent)' : 'transparent',
              color: 'white',
              borderRadius: 12,
              padding: '10px 4px',
              fontSize: '0.78rem',
              fontWeight: current === item.screen ? 800 : 600
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  )
}

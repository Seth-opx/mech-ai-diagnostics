import { useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { BottomNav } from '../components/BottomNav'
import { useAuth } from '../context/AuthContext'
import { useApp } from '../context/AppContext'

export default function Profile() {
  const { user, logout } = useAuth()
  const { isPremium, credits } = useApp()
  const navigate = useNavigate()

  return (
    <div className="app">
      <div className="screen">
        <Header title="👤 Profil" />

        <div className="card" style={{ textAlign: 'center', padding: '30px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>👤</div>
          <h2 style={{ marginBottom: '4px' }}>{user?.email}</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {isPremium ? '⭐ Premium' : 'Compte gratuit'}
          </p>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '12px' }}>📊 Statistiques</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ textAlign: 'center', padding: '16px', background: 'var(--secondary)', borderRadius: '10px' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>🔋</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>{credits}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Crédits/jour</div>
            </div>
            <div style={{ textAlign: 'center', padding: '16px', background: 'var(--secondary)', borderRadius: '10px' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>📋</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>0</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Diagnostics</div>
            </div>
          </div>
        </div>

        {!isPremium && (
          <div className="card" style={{ borderColor: 'var(--accent)' }}>
            <h3 style={{ marginBottom: '8px' }}>⭐ Débloquer Premium</h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '12px', color: 'var(--text-muted)' }}>
              Crédits illimités, diagnostics prioritaires, et plus encore.
            </p>
            <button
              onClick={() => navigate('/paywall')}
              style={{ background: 'var(--accent)', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '10px', cursor: 'pointer', width: '100%', fontWeight: 600 }}
            >
              Voir les offres
            </button>
          </div>
        )}

        <div style={{ marginTop: '16px' }}>
          <button
            onClick={logout}
            style={{ background: 'none', border: '1px solid var(--error)', color: 'var(--error)', padding: '12px', borderRadius: '10px', cursor: 'pointer', width: '100%' }}
          >
            Déconnexion
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
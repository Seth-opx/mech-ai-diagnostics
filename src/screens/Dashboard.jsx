import { useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { BottomNav } from '../components/BottomNav'
import { CreditBadge } from '../components/CreditBadge'
import { DisclaimerBox } from '../components/DisclaimerBox'
import { PrimaryButton } from '../components/PrimaryButton'
import { useAuth } from '../context/AuthContext'
import { useApp } from '../context/AppContext'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const { credits, isPremium, history } = useApp()
  const navigate = useNavigate()

  const lastDiagnosis = history[0]

  return (
    <div className="app">
      <div className="screen">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '1.3rem' }}>Méco-IA</h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{user?.email}</p>
          </div>
          <CreditBadge />
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '30px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
          <h2 style={{ marginBottom: '8px' }}>Diagnostic IA</h2>
          <p style={{ fontSize: '0.9rem', marginBottom: '20px' }}>
            Analysez votre véhicule en envoyant une photo et en décrivant les symptômes.
          </p>
          <PrimaryButton onClick={() => navigate('/capture')}>
            📷 Nouveau diagnostic
          </PrimaryButton>
        </div>

        {lastDiagnosis && (
          <div className="card">
            <h3 style={{ marginBottom: '8px' }}>📋 Dernier diagnostic</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              {new Date(lastDiagnosis.date).toLocaleDateString('fr-FR')}
            </p>
            <p style={{ fontSize: '0.95rem' }}>{lastDiagnosis.diagnosis?.substring(0, 100)}...</p>
            <button
              onClick={() => navigate('/result', { state: { diagnosis: lastDiagnosis } })}
              style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', marginTop: '8px', fontSize: '0.9rem' }}
            >
              Voir le détail →
            </button>
          </div>
        )}

        <div style={{ marginTop: '16px' }}>
          <DisclaimerBox />
        </div>

        <div style={{ marginTop: '16px' }}>
          <button onClick={logout} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem' }}>
            Déconnexion
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
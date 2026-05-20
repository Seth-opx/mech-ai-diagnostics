import { useLocation, useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { BottomNav } from '../components/BottomNav'
import { DisclaimerBox } from '../components/DisclaimerBox'
import { PrimaryButton } from '../components/PrimaryButton'

const severityColors = { low: 'var(--success)', medium: 'var(--warning)', high: 'var(--error)' }

export default function Result() {
  const { state } = useLocation()
  const { diagnosis } = state || {}
  const navigate = useNavigate()

  if (!diagnosis) {
    return (
      <div className="screen">
        <ErrorMessage message="Aucun résultat disponible" />
        <PrimaryButton onClick={() => navigate('/dashboard')}>Retour au dashboard</PrimaryButton>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="screen">
        <Header title="📊 Résultat du diagnostic" />

        <div className="card" style={{ borderLeft: `4px solid ${severityColors[diagnosis.severity] || 'var(--accent)'}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: severityColors[diagnosis.severity] || 'var(--accent)' }}>
              {diagnosis.severity || 'medium'} sévérité
            </span>
            {diagnosis.confidence && (
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Confiance: {Math.round(diagnosis.confidence * 100)}%
              </span>
            )}
          </div>

          <p style={{ fontSize: '1rem', lineHeight: 1.6, marginBottom: '16px' }}>{diagnosis.diagnosis}</p>

          {diagnosis.remainingCredits !== undefined && (
            <p style={{ fontSize: '0.85rem', color: 'var(--accent)' }}>
              🔋 Crédits restants : {diagnosis.remainingCredits}
            </p>
          )}
        </div>

        {diagnosis.possibleCauses?.length > 0 && (
          <div className="card">
            <h3 style={{ marginBottom: '8px' }}>🔎 Causes possibles</h3>
            <ul style={{ paddingLeft: '20px' }}>
              {diagnosis.possibleCauses.map((cause, i) => (
                <li key={i} style={{ marginBottom: '6px', color: 'var(--text-muted)' }}>{cause}</li>
              ))}
            </ul>
          </div>
        )}

        {diagnosis.recommendedActions?.length > 0 && (
          <div className="card">
            <h3 style={{ marginBottom: '8px' }}>✅ Actions recommandées</h3>
            <ul style={{ paddingLeft: '20px' }}>
              {diagnosis.recommendedActions.map((action, i) => (
                <li key={i} style={{ marginBottom: '6px', color: 'var(--text-muted)' }}>{action}</li>
              ))}
            </ul>
          </div>
        )}

        <DisclaimerBox />

        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <PrimaryButton onClick={() => navigate('/capture')}>🔄 Nouveau diagnostic</PrimaryButton>
          <button onClick={() => navigate('/dashboard')} style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--text)', padding: '12px', borderRadius: '10px', cursor: 'pointer' }}>
            ← Dashboard
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}

function ErrorMessage({ message }) {
  return <div className="error-box" style={{ marginBottom: '16px' }}>{message}</div>
}
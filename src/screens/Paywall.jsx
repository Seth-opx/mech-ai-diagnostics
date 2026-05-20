import { useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'

export default function Paywall() {
  const navigate = useNavigate()

  const plans = [
    { id: 'monthly', name: 'Mensuel', price: '4,99 €', period: '/mois' },
    { id: 'yearly', name: 'Annuel', price: '39,99 €', period: '/an', badge: 'Économisez 33%' },
  ]

  return (
    <div className="screen">
      <Header title="⭐ Premium" />

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '12px' }}>⭐</div>
        <h2 style={{ marginBottom: '8px' }}>Débloquez Premium</h2>
        <p style={{ color: 'var(--text-muted)' }}>Accédez à des diagnostics illimités</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {plans.map(plan => (
          <div key={plan.id} className="card" style={{ position: 'relative' }}>
            {plan.badge && (
              <div style={{
                position: 'absolute', top: '-10px', right: '16px',
                background: 'var(--accent)', color: 'white',
                padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem'
              }}>
                {plan.badge}
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ marginBottom: '4px' }}>{plan.name}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Diagnostics illimités + fonctionnalités premium
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{plan.price}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{plan.period}</div>
              </div>
            </div>
            <button
              style={{
                marginTop: '16px', background: 'var(--accent)', color: 'white',
                border: 'none', padding: '12px', borderRadius: '10px',
                cursor: 'pointer', width: '100%', fontWeight: 600
              }}
              onClick={() => alert('RevenueCat / Google Play Billing - À implémenter après APK stable')}
            >
              S'abonner
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('/profile')}
        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginTop: '20px', fontSize: '0.9rem' }}
      >
        ← Retour au profil
      </button>
    </div>
  )
}
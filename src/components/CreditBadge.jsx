import { useApp } from '../context/AppContext'

export function CreditBadge() {
  const { credits, isPremium } = useApp()

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      background: isPremium ? 'var(--accent)' : 'var(--card-bg)',
      padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem'
    }}>
      <span>{isPremium ? '⭐ Premium' : `🔋 ${credits} crédits`}</span>
    </div>
  )
}
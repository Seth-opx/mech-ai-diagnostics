import CreditBadge from './CreditBadge.jsx'

export default function Header({ title = 'Méco-IA', onDebug, showCredits = true }) {
  return (
    <header style={{
      width: '100%',
      maxWidth: 520,
      margin: '0 auto',
      padding: '18px 20px 8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12
    }}>
      <div>
        <h1>{title}</h1>
        <p className="small">Assistant diagnostic auto</p>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {showCredits && <CreditBadge />}
        {onDebug && (
          <button className="btn-secondary" style={{ width: 'auto', padding: '8px 10px' }} onClick={onDebug}>
            Debug
          </button>
        )}
      </div>
    </header>
  )
}

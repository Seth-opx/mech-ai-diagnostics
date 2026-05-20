export function LoadingSpinner({ message = 'Chargement...' }) {
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <div className="spinner" />
      <p style={{ marginTop: '16px', color: 'var(--text-muted)' }}>{message}</p>
    </div>
  )
}
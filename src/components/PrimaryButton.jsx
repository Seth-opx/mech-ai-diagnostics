export function PrimaryButton({ children, onClick, disabled, variant = 'primary' }) {
  const style = variant === 'primary' ? {
    background: 'var(--accent)', color: 'white', border: 'none'
  } : {
    background: 'var(--card-bg)', color: 'var(--text)', border: '1px solid var(--border)'
  }

  return (
    <button
      className="btn-primary"
      onClick={onClick}
      disabled={disabled}
      style={{ ...style, width: '100%', padding: '14px 24px', borderRadius: '12px', fontSize: '1rem', fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1 }}
    >
      {children}
    </button>
  )
}
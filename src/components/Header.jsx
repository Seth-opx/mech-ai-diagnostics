export function Header({ title, subtitle }) {
  return (
    <header style={{ padding: '16px 0', marginBottom: '16px', borderBottom: '1px solid var(--border)' }}>
      <h1 style={{ fontSize: '1.5rem' }}>{title}</h1>
      {subtitle && <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>{subtitle}</p>}
    </header>
  )
}
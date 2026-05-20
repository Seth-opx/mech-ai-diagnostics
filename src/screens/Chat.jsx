import { Header } from '../components/Header'

export default function Chat() {
  return (
    <div className="screen">
      <Header title="💬 Chat IA" />
      <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>💬</div>
        <p style={{ color: 'var(--text-muted)' }}>Chat IA à venir</p>
      </div>
    </div>
  )
}
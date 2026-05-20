import { Header } from '../components/Header'

export default function Garages() {
  return (
    <div className="screen">
      <Header title=" Garage" />
      <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔧</div>
        <p style={{ color: 'var(--text-muted)' }}>Annuaire garages à venir</p>
      </div>
    </div>
  )
}
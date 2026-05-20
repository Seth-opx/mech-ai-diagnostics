import { Header } from '../components/Header'

export default function CaptureVideo() {
  return (
    <div className="screen">
      <Header title="🎥 Capture vidéo" />
      <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎥</div>
        <p style={{ color: 'var(--text-muted)' }}>Fonctionnalité à venir</p>
      </div>
    </div>
  )
}
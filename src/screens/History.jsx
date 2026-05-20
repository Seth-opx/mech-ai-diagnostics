import { useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { BottomNav } from '../components/BottomNav'
import { useApp } from '../context/AppContext'

export default function History() {
  const { history } = useApp()
  const navigate = useNavigate()

  return (
    <div className="app">
      <div className="screen">
        <Header title="📋 Historique" />

        {history.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📋</div>
            <p style={{ color: 'var(--text-muted)' }}>Aucun diagnostic pour le moment</p>
            <button
              onClick={() => navigate('/capture')}
              style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', marginTop: '12px' }}
            >
              Faire un diagnostic →
            </button>
          </div>
        ) : (
          history.map(item => (
            <div key={item.id} className="card" style={{ cursor: 'pointer' }} onClick={() => navigate('/result', { state: { diagnosis: item } })}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {new Date(item.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                </span>
                {item.severity && (
                  <span style={{
                    fontSize: '0.75rem', textTransform: 'uppercase',
                    color: item.severity === 'high' ? 'var(--error)' : item.severity === 'medium' ? 'var(--warning)' : 'var(--success)'
                  }}>
                    {item.severity}
                  </span>
                )}
              </div>
              <p style={{ fontSize: '0.95rem' }}>{item.diagnosis?.substring(0, 100)}...</p>
              {item.vehicleType && (
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                  {item.vehicleType === 'auto' ? '🚗' : '🏍️'}
                </p>
              )}
            </div>
          ))
        )}
      </div>
      <BottomNav />
    </div>
  )
}
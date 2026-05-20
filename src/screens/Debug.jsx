import { useAuth } from '../context/AuthContext.jsx'
import { useApp } from '../context/AppContext.jsx'

export default function Debug() {
  const auth = useAuth()
  const app = useApp()

  return (
    <main className="screen">
      <h2>Debug</h2>
      <div className="card">
        <pre style={{ whiteSpace: 'pre-wrap', color: 'var(--text-muted)', fontSize: 12 }}>
          {JSON.stringify({
            mockMode: auth.mockMode,
            user: auth.user?.email || null,
            credits: app.credits,
            isPremium: app.isPremium,
            historyCount: app.history.length,
            hasLastCapture: Boolean(app.lastCapture)
          }, null, 2)}
        </pre>
      </div>
    </main>
  )
}

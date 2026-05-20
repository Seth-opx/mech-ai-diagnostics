import { useAuth } from '../context/AuthContext.jsx'
import { useApp } from '../context/AppContext.jsx'
import { SCREENS } from '../utils/constants.js'

export default function Profile({ navigate }) {
  const { user, logout, mockMode } = useAuth()
  const { credits, isPremium } = useApp()

  async function disconnect() {
    await logout()
    navigate(SCREENS.LOGIN)
  }

  return (
    <main className="screen">
      <div className="card">
        <h2>Profil</h2>
        <p>Email: {user?.email || 'Non connecté'}</p>
        <p>Mode: {mockMode ? 'Démo' : 'Firebase'}</p>
        <p>Crédits: {credits}</p>
        <p>Premium: {isPremium ? 'Oui' : 'Non'}</p>
        <button className="btn-secondary" style={{ marginTop: 12 }} onClick={() => navigate(SCREENS.PAYWALL)}>
          Gérer l'abonnement
        </button>
        <button className="btn-primary" style={{ marginTop: 10 }} onClick={disconnect}>
          Déconnexion
        </button>
      </div>
    </main>
  )
}

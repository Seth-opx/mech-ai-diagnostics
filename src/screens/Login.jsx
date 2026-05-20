import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { SCREENS } from '../utils/constants.js'
import ErrorMessage from '../components/ErrorMessage.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'

export default function Login({ navigate }) {
  const { login, signup, mockMode } = useAuth()
  const [email, setEmail] = useState('demo@mecoia.app')
  const [password, setPassword] = useState('demo1234')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(mode) {
    setError('')
    setLoading(true)
    try {
      if (mode === 'signup') await signup(email, password)
      else await login(email, password)
      navigate(SCREENS.DASHBOARD)
    } catch (e) {
      setError(e?.message || 'Connexion impossible')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="screen">
      <div className="card">
        <h2>Connexion</h2>
        {mockMode && <p className="small" style={{ marginBottom: 12 }}>Mode démo actif: Firebase non configuré.</p>}
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe" type="password" />
        <ErrorMessage message={error} />
        <PrimaryButton loading={loading} onClick={() => submit('login')}>Se connecter</PrimaryButton>
        <button className="btn-secondary" style={{ marginTop: 10 }} onClick={() => submit('signup')}>
          Créer un compte
        </button>
      </div>
    </main>
  )
}

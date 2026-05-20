import { useState } from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../services/firebase'
import { ErrorMessage } from '../components/ErrorMessage'
import { PrimaryButton } from '../components/PrimaryButton'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)

  const handleSubmit = async () => {
    if (!email || !password) return
    setLoading(true)
    setError('')
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="screen" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ fontSize: '4rem' }}>🔧</div>
        <h1 style={{ fontSize: '2rem', marginTop: '16px' }}>Méco-IA</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Connexion à votre compte</p>
      </div>

      {error && <ErrorMessage message={error} />}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ marginBottom: '12px' }}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ marginBottom: '20px' }}
      />

      <PrimaryButton onClick={handleSubmit} disabled={loading || !email || !password}>
        {loading ? 'Chargement...' : isSignUp ? 'Créer un compte' : 'Se connecter'}
      </PrimaryButton>

      <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem' }}>
        {isSignUp ? 'Déjà un compte ?' : 'Pas de compte ?'}{' '}
        <span style={{ color: 'var(--accent)', cursor: 'pointer' }} onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Se connecter' : 'Créer un compte'}
        </span>
      </p>
    </div>
  )
}
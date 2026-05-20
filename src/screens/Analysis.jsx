import { useState } from 'react'
import { diagnoseVehicle } from '../services/diagnoseApi.js'
import { saveDiagnosis } from '../services/supabase.js'
import { useApp } from '../context/AppContext.jsx'
import { SCREENS } from '../utils/constants.js'
import ErrorMessage from '../components/ErrorMessage.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'

export default function Analysis({ navigate }) {
  const { consumeCredit, addToHistory, lastCapture, isPremium, credits } = useApp()
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function runDiagnosis() {
    setError('')

    if (!isPremium && credits <= 0) {
      navigate(SCREENS.PAYWALL)
      return
    }

    const consumed = consumeCredit()
    if (!consumed) {
      navigate(SCREENS.PAYWALL)
      return
    }

    setLoading(true)
    try {
      const result = await diagnoseVehicle({
        type: lastCapture?.type || 'text',
        payload: lastCapture?.payload || null,
        description
      })
      const saved = addToHistory(result)
      await saveDiagnosis(saved)
      navigate(SCREENS.RESULT)
    } catch (e) {
      setError(e?.message || 'Analyse impossible')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="screen">
      <div className="card">
        <h2>Analyse du véhicule</h2>
        <p style={{ marginBottom: 12 }}>
          Décris les symptômes: bruit, voyant, odeur, perte de puissance, démarrage, fumée, etc.
        </p>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Ex: voyant moteur orange, voiture qui tremble au ralenti..."
        />
        <ErrorMessage message={error} />
        <PrimaryButton loading={loading} onClick={runDiagnosis}>Lancer le diagnostic</PrimaryButton>
      </div>
    </main>
  )
}

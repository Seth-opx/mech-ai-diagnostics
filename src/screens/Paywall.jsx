import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { purchasePremium } from '../services/revenuecat.js'
import { showRewardedAd } from '../services/admob.js'
import { SCREENS } from '../utils/constants.js'
import PrimaryButton from '../components/PrimaryButton.jsx'

export default function Paywall({ navigate }) {
  const { addCredits, setIsPremium } = useApp()
  const [loading, setLoading] = useState(false)

  async function watchAd() {
    setLoading(true)
    try {
      const result = await showRewardedAd()
      if (result.rewarded) addCredits(1)
      navigate(SCREENS.DASHBOARD)
    } finally {
      setLoading(false)
    }
  }

  async function buyPremium() {
    setLoading(true)
    try {
      const result = await purchasePremium()
      if (result.premium) setIsPremium(true)
      navigate(SCREENS.DASHBOARD)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="screen">
      <div className="card">
        <h2>Débloquer Méco-IA</h2>
        <p style={{ marginBottom: 16 }}>Obtiens des crédits ou active le Premium illimité.</p>
        <PrimaryButton loading={loading} onClick={buyPremium}>Activer Premium</PrimaryButton>
        <button className="btn-secondary" style={{ marginTop: 10 }} disabled={loading} onClick={watchAd}>
          Regarder une pub pour +1 crédit
        </button>
      </div>
    </main>
  )
}

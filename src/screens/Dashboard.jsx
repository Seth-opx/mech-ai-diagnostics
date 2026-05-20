import DisclaimerBox from '../components/DisclaimerBox.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'
import { SCREENS } from '../utils/constants.js'
import { useApp } from '../context/AppContext.jsx'

export default function Dashboard({ navigate }) {
  const { credits, isPremium } = useApp()

  return (
    <main className="screen">
      <div className="card">
        <h2>Que veux-tu analyser ?</h2>
        <p style={{ marginBottom: 16 }}>
          Prends une photo, une vidéo, ou décris le problème de ton véhicule.
        </p>
        <div className="row">
          <button className="btn-secondary" onClick={() => navigate(SCREENS.CAPTURE_PHOTO)}>Photo</button>
          <button className="btn-secondary" onClick={() => navigate(SCREENS.CAPTURE_VIDEO)}>Vidéo</button>
        </div>
        <div style={{ marginTop: 12 }}>
          <PrimaryButton onClick={() => navigate(SCREENS.ANALYSIS)}>Diagnostic texte</PrimaryButton>
        </div>
      </div>

      <div className="card">
        <h3>Statut</h3>
        <p>{isPremium ? 'Compte Premium actif.' : `Il te reste ${credits} crédit(s) diagnostic.`}</p>
        {!isPremium && credits <= 0 && (
          <button className="btn-primary" style={{ marginTop: 12 }} onClick={() => navigate(SCREENS.PAYWALL)}>
            Obtenir des crédits
          </button>
        )}
      </div>

      <DisclaimerBox />
    </main>
  )
}

import { useApp } from '../context/AppContext.jsx'
import { SCREENS } from '../utils/constants.js'

export default function CaptureVideo({ navigate }) {
  const { setLastCapture } = useApp()

  function mockVideo() {
    setLastCapture({ type: 'video', payload: 'video-demo' })
    navigate(SCREENS.ANALYSIS)
  }

  return (
    <main className="screen">
      <div className="card">
        <h2>Capture vidéo</h2>
        <p style={{ marginBottom: 16 }}>
          La capture vidéo native dépend de l'intégration Android. Pour cette version debug, un mode démo est activé.
        </p>
        <button className="btn-primary" onClick={mockVideo}>Utiliser une vidéo démo</button>
      </div>
    </main>
  )
}

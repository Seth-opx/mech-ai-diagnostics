import { useState } from 'react'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { useApp } from '../context/AppContext.jsx'
import { SCREENS } from '../utils/constants.js'
import ErrorMessage from '../components/ErrorMessage.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'

export default function CapturePhoto({ navigate }) {
  const { setLastCapture } = useApp()
  const [preview, setPreview] = useState('')
  const [error, setError] = useState('')

  async function takePhoto() {
    setError('')
    try {
      const photo = await Camera.getPhoto({
        quality: 75,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      })
      setPreview(photo.dataUrl)
      setLastCapture({ type: 'photo', payload: photo.dataUrl })
    } catch (e) {
      setError(e?.message || "Photo impossible. Sur navigateur, l'app peut nécessiter une permission caméra.")
    }
  }

  return (
    <main className="screen">
      <div className="card">
        <h2>Capture photo</h2>
        <p style={{ marginBottom: 12 }}>Photographie le voyant, le moteur, le pneu ou la pièce concernée.</p>
        <ErrorMessage message={error} />
        {preview && <img src={preview} alt="Aperçu" style={{ width: '100%', borderRadius: 14, marginBottom: 12 }} />}
        <PrimaryButton onClick={takePhoto}>Prendre une photo</PrimaryButton>
        <button className="btn-secondary" style={{ marginTop: 10 }} onClick={() => navigate(SCREENS.ANALYSIS)}>
          Continuer vers l'analyse
        </button>
      </div>
    </main>
  )
}

import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { DisclaimerBox } from '../components/DisclaimerBox'
import { PrimaryButton } from '../components/PrimaryButton'
import { ErrorMessage } from '../components/ErrorMessage'

export default function CapturePhoto() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [vehicleType, setVehicleType] = useState('auto')
  const [symptoms, setSymptoms] = useState('')
  const [error, setError] = useState('')
  const fileInput = useRef(null)
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    const f = e.target.files[0]
    if (!f) return
    if (f.size > 20 * 1024 * 1024) {
      setError('Fichier trop volumineux (max 20 Mo)')
      return
    }
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setError('')
  }

  const handleSubmit = () => {
    if (!file) {
      setError('Sélectionne une photo')
      return
    }
    navigate('/analysis', { state: { file, vehicleType, symptoms } })
  }

  return (
    <div className="screen">
      <Header title="📷 Nouveau diagnostic" />

      {error && <ErrorMessage message={error} />}

      <div className="card">
        <p style={{ marginBottom: '12px', fontSize: '0.9rem' }}>Sélectionne une photo du problème : moteur, pièce, bruit, voyant...</p>
        
        <input
          type="file"
          accept="image/*"
          capture="environment"
          ref={fileInput}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        <div
          onClick={() => fileInput.current?.click()}
          style={{
            border: '2px dashed var(--border)', borderRadius: '12px', padding: '40px', textAlign: 'center',
            cursor: 'pointer', marginBottom: '16px'
          }}
        >
          {preview ? (
            <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }} />
          ) : (
            <>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📸</div>
              <p style={{ color: 'var(--text-muted)' }}>Appuie pour prendre une photo</p>
            </>
          )}
        </div>

        <select value={vehicleType} onChange={e => setVehicleType(e.target.value)} style={{ marginBottom: '12px' }}>
          <option value="auto">🚗 Automobile</option>
          <option value="moto">🏍️ Motocyclette</option>
        </select>

        <textarea
          placeholder="Décris les symptômes (bruit, odeur, vibration...)"
          value={symptoms}
          onChange={e => setSymptoms(e.target.value)}
          rows={3}
          style={{ resize: 'none' }}
        />

        <DisclaimerBox />

        <div style={{ marginTop: '16px' }}>
          <PrimaryButton onClick={handleSubmit} disabled={!file}>
            🔍 Analyser
          </PrimaryButton>
        </div>

        <button
          onClick={() => navigate('/dashboard')}
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginTop: '12px', fontSize: '0.9rem' }}
        >
          ← Retour
        </button>
      </div>
    </div>
  )
}
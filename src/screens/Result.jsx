import DisclaimerBox from '../components/DisclaimerBox.jsx'
import { useApp } from '../context/AppContext.jsx'
import { SCREENS } from '../utils/constants.js'

export default function Result({ navigate }) {
  const { currentDiagnosis } = useApp()

  if (!currentDiagnosis) {
    return (
      <main className="screen">
        <div className="card">
          <h2>Aucun résultat</h2>
          <button className="btn-primary" onClick={() => navigate(SCREENS.ANALYSIS)}>Faire un diagnostic</button>
        </div>
      </main>
    )
  }

  return (
    <main className="screen">
      <div className="card">
        <h2>{currentDiagnosis.title}</h2>
        <p><strong>Confiance:</strong> {currentDiagnosis.confidence}%</p>
        <p><strong>Gravité:</strong> {currentDiagnosis.severity}</p>
        <p style={{ marginTop: 12 }}>{currentDiagnosis.summary}</p>
      </div>

      <div className="card">
        <h3>Causes probables</h3>
        <ul style={{ paddingLeft: 20, color: 'var(--text-muted)' }}>
          {(currentDiagnosis.causes || []).map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </div>

      <div className="card">
        <h3>Actions recommandées</h3>
        <ul style={{ paddingLeft: 20, color: 'var(--text-muted)' }}>
          {(currentDiagnosis.actions || []).map((item, index) => <li key={index}>{item}</li>)}
        </ul>
        <p style={{ marginTop: 12 }}><strong>Coût estimé:</strong> {currentDiagnosis.estimatedCost}</p>
      </div>

      <DisclaimerBox />
    </main>
  )
}

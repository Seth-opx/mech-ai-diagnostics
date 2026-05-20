import { useApp } from '../context/AppContext.jsx'
import { SCREENS } from '../utils/constants.js'

export default function History({ navigate }) {
  const { history, setCurrentDiagnosis } = useApp()

  return (
    <main className="screen">
      <h2>Historique</h2>
      {history.length === 0 && (
        <div className="card">
          <p>Aucun diagnostic enregistré pour le moment.</p>
        </div>
      )}

      {history.map(item => (
        <button
          key={item.id}
          className="card"
          style={{ width: '100%', textAlign: 'left', color: 'white', cursor: 'pointer' }}
          onClick={() => {
            setCurrentDiagnosis(item)
            navigate(SCREENS.RESULT)
          }}
        >
          <h3>{item.title}</h3>
          <p>{new Date(item.date).toLocaleString('fr-FR')}</p>
          <p>{item.summary}</p>
        </button>
      ))}
    </main>
  )
}

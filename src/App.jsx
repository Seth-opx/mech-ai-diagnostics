// Minimal test App — replace App.jsx temporarily to test APK
export default function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#1a1a2e',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      textAlign: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      <h1>Méco-IA</h1>
      <p>APK debug lancé avec succès</p>
      <button style={{
        marginTop: 20,
        padding: '14px 22px',
        borderRadius: 12,
        border: 'none',
        background: '#e94560',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1rem',
        cursor: 'pointer'
      }}>
        Entrer dans l'app
      </button>
    </div>
  )
}
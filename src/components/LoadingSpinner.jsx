export default function LoadingSpinner({ label = 'Chargement...' }) {
  return (
    <div style={{ textAlign: 'center', padding: 24 }}>
      <div className="spinner" />
      <p>{label}</p>
    </div>
  )
}

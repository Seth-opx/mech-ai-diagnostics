export function ErrorMessage({ message }) {
  return (
    <div className="error-box">
      {message || 'Une erreur est survenue'}
    </div>
  )
}
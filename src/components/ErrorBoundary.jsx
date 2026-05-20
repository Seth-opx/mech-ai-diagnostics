import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('Erreur React:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="center-screen">
          <div className="card" style={{ maxWidth: 460, textAlign: 'center' }}>
            <h2>Une erreur est survenue</h2>
            <p style={{ marginBottom: 16 }}>{this.state.error?.message || 'Erreur inconnue'}</p>
            <button className="btn-primary" onClick={() => window.location.reload()}>
              Relancer l'application
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

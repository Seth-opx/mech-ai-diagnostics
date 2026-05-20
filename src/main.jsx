import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const rootElement = document.getElementById('root')

function showFatalError(error) {
  const message = error?.message || String(error || 'Erreur inconnue')
  if (!rootElement) return
  rootElement.innerHTML = `
    <div style="min-height:100vh;background:#1a1a2e;color:white;display:flex;align-items:center;justify-content:center;padding:24px;font-family:Arial,sans-serif;">
      <div style="max-width:460px;background:#1e1e30;border:1px solid #2a2a40;border-radius:16px;padding:20px;">
        <h1 style="margin:0 0 12px;">Méco-IA</h1>
        <p style="color:#f87171;">Erreur de démarrage Android/WebView</p>
        <pre style="white-space:pre-wrap;color:#a0a0b0;font-size:12px;">${message}</pre>
      </div>
    </div>
  `
}

window.addEventListener('error', event => showFatalError(event.error || event.message))
window.addEventListener('unhandledrejection', event => showFatalError(event.reason))

try {
  if (!rootElement) throw new Error("Élément #root introuvable dans index.html")

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} catch (error) {
  showFatalError(error)
}

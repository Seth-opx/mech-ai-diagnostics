import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const root = document.getElementById('root')

function showFatalError(error) {
  if (!root) return
  const message = error?.message || String(error || 'Erreur inconnue')
  root.innerHTML = `<div style="min-height:100vh;background:#050816;color:white;display:flex;align-items:center;justify-content:center;padding:24px;font-family:Arial,sans-serif;"><div style="max-width:520px;background:#111827;border:1px solid #22d3ee;border-radius:18px;padding:20px;"><h1>Méco-IA</h1><p style="color:#f87171;">Erreur de démarrage</p><pre style="white-space:pre-wrap;color:#cbd5e1;font-size:12px;">${message}</pre></div></div>`
}

window.addEventListener('error', event => showFatalError(event.error || event.message))
window.addEventListener('unhandledrejection', event => showFatalError(event.reason))

try {
  ReactDOM.createRoot(root).render(<React.StrictMode><App /></React.StrictMode>)
} catch (error) {
  showFatalError(error)
}

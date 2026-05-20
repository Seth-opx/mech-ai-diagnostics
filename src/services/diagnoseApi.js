import { DEFAULT_DIAGNOSIS } from '../utils/constants.js'

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function diagnoseVehicle({ type = 'text', payload = null, description = '' } = {}) {
  const endpoint = import.meta.env.VITE_DIAGNOSE_API_URL

  if (!endpoint) {
    await wait(1200)
    return {
      ...DEFAULT_DIAGNOSIS,
      inputType: type,
      description,
      createdAt: new Date().toISOString(),
      mock: true
    }
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ type, payload, description })
  })

  if (!response.ok) {
    throw new Error(`Erreur diagnostic API: ${response.status}`)
  }

  return response.json()
}

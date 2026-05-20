const MOCK_RESPONSES = [
  {
    diagnosis: "Bruit au démarrage détecté. Vérifie la courroie d'accessoire et le galet tendeur. Si le bruit persiste au ralenti, fais contrôler le compresseur de climatisation.",
    confidence: 0.87,
    possibleCauses: ["Courroie d'accessoire usée", "Galet tendeur défaillant", "Compresseur climat bruyant"],
    recommendedActions: ["Inspection visuelle de la courroie", "Test du galet tendeur", "Écoute au ralenti"],
    severity: "medium",
    remainingCredits: 4,
  },
  {
    diagnosis: "Voyant moteur allumé. Lecture scanner nécessaire pour identifier le code défaut. Causes fréquentes : sonde lambda, injecteurs, ou capteur de position.",
    confidence: 0.82,
    possibleCauses: ["Sonde lambda défaillante", "Injecteurs encrassés", "Capteur APM usé"],
    recommendedActions: ["Scan OBD2 obligatoire", "Contrôle des injecteurs", "Test sonde lambda"],
    severity: "high",
    remainingCredits: 4,
  },
  {
    diagnosis: "Freins qui vibrent à haute vitesse. Symptôme classique de disques voilés ou carrelés. Inspection recommandée avant de reprendre la route.",
    confidence: 0.91,
    possibleCauses: ["Disques voilés", "Plaquettes usées", "Étriers grippés"],
    recommendedActions: ["Contrôle visuel des disques", "Test de planéité", "Inspection étriers"],
    severity: "high",
    remainingCredits: 4,
  },
]

export async function diagnoseImage({ file, vehicleType, symptoms, locale = 'fr-FR', user }) {
  // Mock mode
  if (import.meta.env.VITE_USE_MOCK_AI === 'true' || !import.meta.env.VITE_DIAGNOSE_FUNCTION_URL) {
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000))
    const response = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)]
    return { ...response, remainingCredits: 4 }
  }

  // Real mode
  if (!user) throw new Error('User not authenticated')
  
  const idToken = await user.getIdToken()
  const formData = new FormData()
  formData.append('file', file)
  formData.append('vehicleType', vehicleType)
  formData.append('symptoms', symptoms || '')
  formData.append('locale', locale)

  const response = await fetch(import.meta.env.VITE_DIAGNOSE_FUNCTION_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${idToken}` },
    body: formData
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.error || 'Diagnostic failed')
  }

  return response.json()
}
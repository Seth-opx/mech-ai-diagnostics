export const APP_NAME = 'Méco-IA'

export const SCREENS = {
  SPLASH: 'splash',
  LOGIN: 'login',
  DASHBOARD: 'dashboard',
  CAPTURE_PHOTO: 'capturePhoto',
  CAPTURE_VIDEO: 'captureVideo',
  ANALYSIS: 'analysis',
  RESULT: 'result',
  HISTORY: 'history',
  CHAT: 'chat',
  GARAGES: 'garages',
  PROFILE: 'profile',
  PAYWALL: 'paywall',
  DEBUG: 'debug'
}

export const DISCLAIMER =
  "Méco-IA fournit une aide au diagnostic, pas un avis mécanique certifié. En cas de doute, consulte un professionnel."

export const DEFAULT_DIAGNOSIS = {
  title: 'Diagnostic préliminaire',
  confidence: 72,
  severity: 'Modérée',
  summary: "Les symptômes indiquent un contrôle nécessaire. Les causes probables sont classées par priorité.",
  causes: [
    'Capteur ou connectique défectueuse',
    'Entretien à effectuer',
    'Anomalie moteur ou électronique à confirmer'
  ],
  actions: [
    'Vérifier les niveaux et voyants au tableau de bord',
    'Scanner les codes défaut OBD-II',
    'Consulter un garage si le voyant moteur clignote ou si le véhicule perd de la puissance'
  ],
  estimatedCost: '50 € à 250 € selon la cause'
}

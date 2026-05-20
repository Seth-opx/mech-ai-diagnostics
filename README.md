# Méco-IA

Diagnostic IA pour automobiles et motorcycles.

## Stack

- React 18 + Vite
- Firebase Auth
- Supabase Edge Functions + PostgreSQL
- Gemini 2.5 Flash (via Edge Function)
- RevenueCat (abonnements)
- Google AdMob (monétisation)
- Capacitor Android

## Installation

```bash
git clone https://github.com/Seth-opx/mech-ai-diagnostics.git
cd mech-ai-diagnostics
npm install
npm run dev
```

## Build APK (via GitHub Actions)

1. Aller sur : https://github.com/Seth-opx/mech-ai-diagnostics/actions
2. Cliquer sur "Build Android Debug APK"
3. Cliquer "Run workflow" (branch: main)
4. Attendre ~5 minutes
5. Télécharger l'artifact `mecoia-debug-apk`
6. Installer le fichier APK sur le téléphone
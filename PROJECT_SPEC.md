# PROJECT_SPEC.md — Méco-IA

## Overview

- **Name:** Méco-IA
- **Type:** Mobile app (Android) — AI mechanical diagnostics
- **Concept:** Multimodal AI analyzing engine/parts via camera + microphone
- **Stack:** React + Vite + Capacitor + Firebase + Supabase Edge Functions + Gemini 2.5 Flash + RevenueCat + AdMob

## Status

### Étape 1 — Build React ✅ (2026-05-20)
- Structure de fichiers créée
- Tous les écrans implémentés
- npm install + npm run build → OK
- dist/ généré avec succès

### Étape 2 — V1 Application
- [x] Splash screen
- [x] Firebase Auth (Login)
- [x] Dashboard
- [x] Credits display
- [x] Photo capture
- [x] Symptoms input
- [x] Vehicle type (auto/moto)
- [x] Analysis screen (mock)
- [x] Edge Function call (mock mode)
- [x] Result display
- [x] History
- [x] Profile
- [x] Paywall (placeholder)
- [ ] Video capture (placeholder)
- [ ] Chat (placeholder)
- [ ] Garages (placeholder)

### Étape 3 — Capacitor Android ✅ (2026-05-20)
- ✅ Capacitor packages installés
- ✅ `npx cap init` → capacitor.config.json créé
- ✅ `npx cap add android` → dossier android/ créé
- ✅ `npx cap sync android` → assets synchronisés
- ✅ Workflow GitHub Actions créé : `.github/workflows/android-debug-apk.yml`
- ✅ Code poussé sur GitHub : `github.com/Seth-opx/mech-ai-diagnostics`
- ⏳ APK à générer via GitHub Actions (Seth depuis tablette)

### Étape 4 — APK Debug
- [ ] Générer APK sur machine locale (JAVA requis)
- [ ] Tester sur téléphone
- [ ] Commande : `cd android && ./gradlew assembleDebug`
- [ ] Ou via Android Studio : `npx cap open android` puis Build > Build APK(s)

### Étapes suivantes
- RevenueCat intégration
- AdMob intégration
- Supabase Edge Function (réel)
- AAB signé Play Store

## Services

| Service | Status | Notes |
|---------|--------|-------|
| Firebase Auth | ✅ Configuré | email/password |
| Supabase | ✅ Configuré | Edge Function URL needed |
| Gemini | 🔒 Via Edge | Jamais en frontend |
| RevenueCat | ⏳ À implémenter | Après APK stable |
| AdMob | ⏳ À implémenter | Après UX stable |

## Structure fichiers

```
/src
 /components
   Header.jsx, BottomNav.jsx, LoadingSpinner.jsx
   ErrorMessage.jsx, CreditBadge.jsx, DisclaimerBox.jsx
   PrimaryButton.jsx
 /screens
   Splash, Login, Dashboard, CapturePhoto, CaptureVideo (placeholder)
   Analysis, Result, History, Chat (placeholder)
   Garages (placeholder), Profile, Paywall
 /services
   firebase.js, supabase.js, diagnoseApi.js
   revenuecat.js, admob.js
 /hooks (to add)
 /context
   AuthContext.jsx, AppContext.jsx
 /utils
   constants.js, fileValidation.js, formatDiagnosis.js
 App.jsx, main.jsx, index.css
```

## Budget Kill Switch

- MAX: $5.00/jour
- Kill switch: $4.50 (90%)
- Modèle: Gemini 2.5 Flash uniquement
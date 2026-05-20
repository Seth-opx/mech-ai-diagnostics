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
npm install
cp .env.example .env
# Editer .env avec vos vraies valeurs
npm run dev
```

## Build

```bash
npm run build
```

## Capacitor

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "Méco-IA" "com.mecoia.app" --web-dir=dist
npx cap add android
npm run build && npx cap sync android
npx cap open android
```
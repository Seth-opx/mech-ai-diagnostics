# Build Android avec Capacitor

## Prérequis

- Node.js 18+
- Android Studio
- JDK 17+

## Installation des dépendances

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
```

## Initialisation Capacitor

```bash
npx cap init "Méco-IA" "com.mecoia.app" --web-dir=dist
npx cap add android
```

## Build et sync

```bash
npm run build
npx cap sync android
```

## Ouvrir Android Studio

```bash
npx cap open android
```

## Générer APK debug

Dans Android Studio :
- Build > Build Bundle(s) / APK(s) > Build APK(s)
- Attendre la fin

APK généré :
`android/app/build/outputs/apk/debug/app-debug.apk`

## Transférer sur téléphone

- Connecter le téléphone en USB
- Copier l'APK sur le téléphone
- Installer (autoriser "sources inconnues" si nécessaire)

## AAB pour Play Store (plus tard)

```bash
# Générer le bundle release
npm run build
npx cap sync android
```

Dans Android Studio :
- Build > Generate Signed Bundle / APK
- Choisir Android App Bundle
- Signer avec votre clé d'upload
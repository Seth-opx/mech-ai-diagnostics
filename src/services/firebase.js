import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'

let app = null
let auth = null

function hasFirebaseConfig() {
  return Boolean(
    import.meta.env.VITE_FIREBASE_API_KEY &&
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN &&
    import.meta.env.VITE_FIREBASE_PROJECT_ID &&
    import.meta.env.VITE_FIREBASE_APP_ID
  )
}

export async function getFirebaseApp() {
  if (app) return app
  if (!hasFirebaseConfig()) return null

  const config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  }

  app = getApps().length ? getApps()[0] : initializeApp(config)
  return app
}

export async function getAuthInstance() {
  if (auth) return auth

  const firebaseApp = await getFirebaseApp()
  if (!firebaseApp) return null

  auth = getAuth(firebaseApp)
  return auth
}

export { app, auth }

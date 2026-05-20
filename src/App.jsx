import { useCallback, useMemo, useState } from 'react'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import Header from './components/Header.jsx'
import BottomNav from './components/BottomNav.jsx'
import LoadingSpinner from './components/LoadingSpinner.jsx'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import { AppProvider } from './context/AppContext.jsx'
import { SCREENS } from './utils/constants.js'

import Splash from './screens/Splash.jsx'
import Login from './screens/Login.jsx'
import Dashboard from './screens/Dashboard.jsx'
import CapturePhoto from './screens/CapturePhoto.jsx'
import CaptureVideo from './screens/CaptureVideo.jsx'
import Analysis from './screens/Analysis.jsx'
import Result from './screens/Result.jsx'
import History from './screens/History.jsx'
import Chat from './screens/Chat.jsx'
import Garages from './screens/Garages.jsx'
import Profile from './screens/Profile.jsx'
import Paywall from './screens/Paywall.jsx'
import Debug from './screens/Debug.jsx'

function Router() {
  const { user, loading } = useAuth()
  const [screen, setScreen] = useState(SCREENS.SPLASH)

  const navigate = useCallback(next => {
    setScreen(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const ScreenComponent = useMemo(() => {
    const map = {
      [SCREENS.SPLASH]: Splash,
      [SCREENS.LOGIN]: Login,
      [SCREENS.DASHBOARD]: Dashboard,
      [SCREENS.CAPTURE_PHOTO]: CapturePhoto,
      [SCREENS.CAPTURE_VIDEO]: CaptureVideo,
      [SCREENS.ANALYSIS]: Analysis,
      [SCREENS.RESULT]: Result,
      [SCREENS.HISTORY]: History,
      [SCREENS.CHAT]: Chat,
      [SCREENS.GARAGES]: Garages,
      [SCREENS.PROFILE]: Profile,
      [SCREENS.PAYWALL]: Paywall,
      [SCREENS.DEBUG]: Debug
    }
    return map[screen] || Dashboard
  }, [screen])

  if (loading) {
    return (
      <div className="center-screen">
        <LoadingSpinner label="Préparation de l'application..." />
      </div>
    )
  }

  const authRequired = screen !== SCREENS.LOGIN && screen !== SCREENS.SPLASH
  if (!user && authRequired) {
    return <Login navigate={navigate} />
  }

  const showShell = screen !== SCREENS.SPLASH && screen !== SCREENS.LOGIN

  return (
    <div className="app">
      {showShell && (
        <Header
          title="Méco-IA"
          onDebug={() => navigate(SCREENS.DEBUG)}
          showCredits={screen !== SCREENS.PAYWALL}
        />
      )}
      <ScreenComponent navigate={navigate} currentScreen={screen} />
      {showShell && <BottomNav current={screen} navigate={navigate} />}
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppProvider>
          <Router />
        </AppProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

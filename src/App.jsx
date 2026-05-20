import { useCallback, useMemo, useState } from 'react'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import Header from './components/Header.jsx'
import BottomNav from './components/BottomNav.jsx'
import LoadingSpinner from './components/LoadingSpinner.jsx'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import { AppProvider } from './context/AppContext.jsx'
import { SCREENS } from './utils/constants.js'

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
  const { user, loading, mockMode } = useAuth()
  const [screen, setScreen] = useState(SCREENS.DASHBOARD)

  const navigate = useCallback(next => {
    setScreen(next)
    try {
      window.scrollTo(0, 0)
    } catch {
      // Certains WebView Android anciens n'aiment pas scrollTo avec options.
    }
  }, [])

  const ScreenComponent = useMemo(() => {
    const map = {
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
      <div className="app">
        <div className="center-screen">
          <LoadingSpinner label="Préparation de l'application..." />
        </div>
      </div>
    )
  }

  if (!user && screen !== SCREENS.LOGIN) {
    return (
      <div className="app">
        <Header title="Méco-IA" showCredits={false} />
        <Login navigate={navigate} />
      </div>
    )
  }

  const showShell = screen !== SCREENS.LOGIN

  return (
    <div className="app">
      {showShell && (
        <Header
          title="Méco-IA"
          onDebug={() => navigate(SCREENS.DEBUG)}
          showCredits={screen !== SCREENS.PAYWALL}
        />
      )}

      {mockMode && showShell && (
        <div style={{
          maxWidth: 520,
          width: '100%',
          margin: '0 auto',
          padding: '0 20px 8px'
        }}>
          <div className="disclaimer">Mode démo actif: l'application s'affiche même sans clés Firebase.</div>
        </div>
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

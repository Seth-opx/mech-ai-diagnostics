import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { AppProvider } from './context/AppContext'
import Splash from './screens/Splash'
import Login from './screens/Login'
import Dashboard from './screens/Dashboard'
import CapturePhoto from './screens/CapturePhoto'
import CaptureVideo from './screens/CaptureVideo'
import Analysis from './screens/Analysis'
import Result from './screens/Result'
import History from './screens/History'
import Chat from './screens/Chat'
import Garages from './screens/Garages'
import Profile from './screens/Profile'
import Paywall from './screens/Paywall'
import Debug from './screens/Debug'

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/capture" element={<CapturePhoto />} />
          <Route path="/capture-video" element={<CaptureVideo />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/result" element={<Result />} />
          <Route path="/history" element={<History />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/garages" element={<Garages />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/paywall" element={<Paywall />} />
          <Route path="/debug" element={<Debug />} />
        </Routes>
      </AppProvider>
    </AuthProvider>
  )
}
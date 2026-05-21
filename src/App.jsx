import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import JukeboxPage from './pages/JukeboxPage'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* QR kod bu pattern'e yönlendirir: /#/v/barca-cafe?t=TABLE_TOKEN */}
        <Route path="/v/:slug" element={<JukeboxPage />} />
        {/* Demo modu: slug olmadan açılırsa mock verisiyle çalışır */}
        <Route path="/" element={<JukeboxPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}

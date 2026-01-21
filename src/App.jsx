import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts";
import AuditLinks from "./pages/AuditLinks";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/visao-geral" replace />} />
        <Route path="/visao-geral" element={<Dashboard />} />
        <Route path="/alertas" element={<Alerts />} />
        <Route path="/auditoria" element={<AuditLinks />} />
        {/* Rotas futuras podem ser adicionadas aqui */}
        <Route path="*" element={<Navigate to="/visao-geral" replace />} />
      </Routes>
    </MainLayout>
  );
}

export default App;

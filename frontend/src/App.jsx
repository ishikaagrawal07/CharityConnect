import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import WalletPage from './pages/WalletPage';
import WorldPage from './pages/WorldPage';
import CausesPage from './pages/CausesPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/world" element={<WorldPage />} />
        <Route path="/causes" element={<CausesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;

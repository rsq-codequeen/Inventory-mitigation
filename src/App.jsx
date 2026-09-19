import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import EnterStock from "./pages/EnterStock";
import Dashboard from "./pages/Dashboard";
import LandingPage from './pages/LandingPage';
import AppNavbar from './components/AppNavbar';
import Discounts from './pages/Discount';
import Analytics from './pages/Analytics';
function AppContent() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const root = document.documentElement;

    if (isLandingPage) {
      root.classList.remove('dark');
      return;
    }

    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [isLandingPage, theme]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {!isLandingPage && (
        <AppNavbar
          theme={theme}
          onToggleTheme={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
        />
      )}
      
      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/enter-stock" element={<EnterStock />} />
          <Route path="/discount" element={<Discounts />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AppContent />
  );
}

export default App;
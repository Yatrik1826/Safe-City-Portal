import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Simulation from './pages/Simulation.jsx';
import Incidents from './pages/Incidents.jsx';
import Auth from './pages/Auth.jsx';
import OfficerDashboard from './pages/OfficerDashboard.jsx';
import AdminIncidents from './pages/admin/AdminIncidents.jsx';
import CitizenHome from './pages/citizen/CitizenHome.jsx';
import RecordIncident from './pages/citizen/RecordIncident.jsx';
import EmergencyContacts from './pages/citizen/EmergencyContacts.jsx';
import LiveSafe from './pages/citizen/LiveSafe.jsx';
import BeNirbhayaWith from './pages/citizen/BeNirbhayaWith.jsx';
import Chatbot from './pages/citizen/Chatbot.jsx';
import AdditionalFeatures from './pages/citizen/AdditionalFeatures.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import OfficerLayout from './layouts/OfficerLayout.jsx';
import CitizenLayout from './layouts/CitizenLayout.jsx';
import { getRole, isAuthed } from './utils/auth.js';

const roleHome = (role) => {
  if (role === 'admin') return '/admin/home';
  if (role === 'officer') return '/officer/home';
  return '/citizen/home';
};

export default function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const role = getRole();
  const authed = isAuthed();

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <Routes>
      <Route path="/" element={authed ? <Navigate to={roleHome(role)} replace /> : <Navigate to="/auth" replace />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/login" element={<Navigate to="/auth" replace />} />

      <Route
        path="/admin/home"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminLayout onToggleTheme={() => setDarkMode((prev) => !prev)} darkMode={darkMode}>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/incidents"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminLayout onToggleTheme={() => setDarkMode((prev) => !prev)} darkMode={darkMode}>
              <AdminIncidents />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/simulation"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminLayout onToggleTheme={() => setDarkMode((prev) => !prev)} darkMode={darkMode}>
              <Simulation />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/officer/home"
        element={
          <ProtectedRoute roles={['officer', 'admin']}>
            <OfficerLayout>
              <OfficerDashboard />
            </OfficerLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/officer/incidents"
        element={
          <ProtectedRoute roles={['officer', 'admin']}>
            <OfficerLayout>
              <Incidents />
            </OfficerLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/citizen/home"
        element={
          <ProtectedRoute roles={['user', 'admin', 'officer']}>
            <CitizenLayout>
              <CitizenHome />
            </CitizenLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/citizen/record"
        element={
          <ProtectedRoute roles={['user', 'admin', 'officer']}>
            <CitizenLayout>
              <RecordIncident />
            </CitizenLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/citizen/contacts"
        element={
          <ProtectedRoute roles={['user', 'admin', 'officer']}>
            <CitizenLayout>
              <EmergencyContacts />
            </CitizenLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/citizen/livesafe"
        element={
          <ProtectedRoute roles={['user', 'admin', 'officer']}>
            <CitizenLayout>
              <LiveSafe />
            </CitizenLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/citizen/nirbhaya-with"
        element={
          <ProtectedRoute roles={['user', 'admin', 'officer']}>
            <CitizenLayout>
              <BeNirbhayaWith />
            </CitizenLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/citizen/chatbot"
        element={
          <ProtectedRoute roles={['user', 'admin', 'officer']}>
            <CitizenLayout>
              <Chatbot />
            </CitizenLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/citizen/additional"
        element={
          <ProtectedRoute roles={['user', 'admin', 'officer']}>
            <CitizenLayout>
              <AdditionalFeatures />
            </CitizenLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/citizen/incidents"
        element={
          <ProtectedRoute roles={['user', 'admin', 'officer']}>
            <CitizenLayout>
              <Incidents />
            </CitizenLayout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to={authed ? roleHome(role) : '/auth'} replace />} />
    </Routes>
  );
}

import { NavLink, useNavigate } from 'react-router-dom';
import { clearAuth } from '../utils/auth.js';

const navItems = [
  { label: 'Overview', to: '/admin/home' },
  { label: 'Incidents', to: '/admin/incidents' },
  { label: 'Simulation', to: '/admin/simulation' },
];

export default function AdminLayout({ children, onToggleTheme, darkMode }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate('/auth');
  };

  return (
    <div className="dashboard-grid">
      <aside className="bg-navy text-white px-6 py-10 flex flex-col gap-8">
        <div>
          <p className="text-xs uppercase tracking-widest text-steel">Command Center</p>
          <h1 className="font-display text-2xl tracking-wide mt-2">Nirbhaya Safe City</h1>
        </div>
        <nav className="flex flex-col gap-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive ? 'bg-white text-navy' : 'text-sky hover:bg-white/10'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={onToggleTheme}
          className="rounded-xl border border-white/20 px-4 py-2 text-sm"
        >
          {darkMode ? 'Switch to Light' : 'Switch to Dark'}
        </button>
        <button
          onClick={handleLogout}
          className="rounded-xl border border-white/20 px-4 py-2 text-sm"
        >
          Logout
        </button>
        <div className="mt-auto bg-white/10 rounded-xl p-4">
          <p className="text-xs uppercase tracking-widest text-steel">System Status</p>
          <div className="mt-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
            <span className="text-sm">Operational</span>
          </div>
        </div>
      </aside>

      <main className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl">Admin Console</h2>
            <p className="text-sm text-steel">Enterprise monitoring and analytics</p>
          </div>
          <div className="bg-white/70 rounded-2xl px-5 py-3 border border-sky">
            <p className="text-xs uppercase text-steel">System Time</p>
            <p className="font-semibold">{new Date().toLocaleString()}</p>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}

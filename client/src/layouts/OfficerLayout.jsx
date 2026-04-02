import { NavLink, useNavigate } from 'react-router-dom';
import { clearAuth } from '../utils/auth.js';

const navItems = [
  { label: 'Officer Desk', to: '/officer/home' },
  { label: 'Incidents', to: '/officer/incidents' },
];

export default function OfficerLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate('/auth');
  };

  return (
    <div className="dashboard-grid">
      <aside className="bg-navy text-white px-6 py-10 flex flex-col gap-8">
        <div>
          <h1 className="font-display text-2xl tracking-wide">Nirbhaya Safe City</h1>
          <p className="text-sm text-steel mt-2">Officer Operations</p>
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
          onClick={handleLogout}
          className="rounded-xl border border-white/20 px-4 py-2 text-sm"
        >
          Logout
        </button>
        <div className="mt-auto bg-white/10 rounded-xl p-4">
          <p className="text-xs uppercase tracking-widest text-steel">Dispatch Ready</p>
          <p className="text-sm">Unit routing enabled</p>
        </div>
      </aside>

      <main className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl">Officer Desk</h2>
            <p className="text-sm text-steel">Triage and response workflow</p>
          </div>
          <div className="rounded-2xl border border-sky px-4 py-2 text-sm">
            Shift: Active
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}

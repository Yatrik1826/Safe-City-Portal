import { NavLink, useNavigate } from 'react-router-dom';
import { clearAuth } from '../utils/auth.js';

const navItems = [
  { label: 'Home', to: '/citizen/home' },
  { label: 'Record', to: '/citizen/record' },
  { label: 'LiveSafe', to: '/citizen/livesafe' },
  { label: 'Contacts', to: '/citizen/contacts' },
];

export default function CitizenLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-sky">
      <header className="bg-gradient-to-r from-navy via-royal to-navy text-white px-6 py-4 flex items-center justify-between shadow-md">
        <div>
          <h1 className="font-display text-xl">Nirbhaya Safe City</h1>
          <p className="text-xs text-sky">Citizen Safety Console</p>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-full bg-white text-navy px-4 py-2 text-xs font-semibold"
        >
          Logout
        </button>
      </header>

      <main className="p-6 space-y-8 pb-24">
        {children}
      </main>

      <nav className="fixed bottom-0 inset-x-0 bg-white/90 backdrop-blur border-t border-sky px-4 py-3 flex items-center justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              `text-xs font-semibold ${isActive ? 'text-royal' : 'text-steel'}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

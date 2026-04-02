import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.js';
import { clearAuth } from '../utils/auth.js';

export default function Auth() {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const payload = mode === 'login' ? { email, password } : { name, email, password, role: 'user' };
      const res = await api.post(endpoint, payload);
      sessionStorage.setItem('token', res.data.token);
      sessionStorage.setItem('user', JSON.stringify(res.data.user));
      setStatus('Success. Redirecting...');
      const role = res.data.user.role;
      if (role === 'admin') navigate('/admin/home');
      else if (role === 'officer') navigate('/officer/home');
      else navigate('/citizen/home');
    } catch (err) {
      setStatus('Authentication failed. Please check your details.');
    }
  };

  const handleClear = () => {
    clearAuth();
    setEmail('');
    setPassword('');
    setName('');
    setStatus(null);
  };

  return (
    <div className="min-h-screen bg-sky flex items-center justify-center p-6">
      <div className="panel-card w-full max-w-2xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="font-display text-3xl">Nirbhaya Safe City</h1>
          <p className="text-sm text-steel">Secure access to safety intelligence</p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setMode('login')}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${mode === 'login' ? 'bg-royal text-white' : 'bg-white border border-sky text-navy'}`}
          >
            Login
          </button>
          <button
            onClick={() => setMode('register')}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${mode === 'register' ? 'bg-royal text-white' : 'bg-white border border-sky text-navy'}`}
          >
            Create Account
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 rounded-full text-sm font-semibold bg-white border border-sky text-navy"
          >
            Clear
          </button>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="text-sm text-steel">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-xl border border-sky px-4 py-2"
                placeholder="Your name"
                required
              />
            </div>
          )}
          <div>
            <label className="text-sm text-steel">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl border border-sky px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="text-sm text-steel">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-sky px-4 py-2"
              required
            />
          </div>
          <button className="w-full bg-royal text-white rounded-xl py-2 font-semibold">
            {mode === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>

        {status && <div className="panel-card p-4 text-sm text-navy">{status}</div>}

        <div className="text-xs text-steel text-center">
          Admin accounts are pre-seeded. Citizen accounts can be created here.
        </div>
      </div>
    </div>
  );
}

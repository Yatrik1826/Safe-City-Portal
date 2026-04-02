import { useState } from 'react';
import api from '../services/api.js';

export default function Login() {
  const [email, setEmail] = useState('admin@nirbhaya.local');
  const [password, setPassword] = useState('Admin@123');
  const [status, setStatus] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setStatus('Login successful. Token stored.');
    } catch (err) {
      setStatus('Login failed.');
    }
  };

  return (
    <div className="space-y-6 max-w-xl">
      <header>
        <h2 className="font-display text-3xl">Secure Access</h2>
        <p className="text-sm text-steel">Authenticate to access admin intelligence systems</p>
      </header>

      <form onSubmit={handleLogin} className="panel-card p-6 space-y-4">
        <div>
          <label className="text-sm text-steel">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-xl border border-sky px-4 py-2"
          />
        </div>
        <div>
          <label className="text-sm text-steel">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-xl border border-sky px-4 py-2"
          />
        </div>
        <button className="w-full bg-royal text-white rounded-xl py-2 font-semibold">Login</button>
      </form>
      {status && <div className="panel-card p-4 text-sm text-navy">{status}</div>}
    </div>
  );
}

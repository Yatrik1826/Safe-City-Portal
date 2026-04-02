import { useState } from 'react';
import api from '../services/api.js';

export default function Simulation() {
  const [count, setCount] = useState(30);
  const [frequency, setFrequency] = useState(6);
  const [status, setStatus] = useState(null);

  const handleGenerate = async () => {
    const res = await api.post('/api/simulate/generate', { count: Number(count) });
    setStatus(`Generated ${res.data.created} incidents`);
  };

  const handleStart = async () => {
    const res = await api.post('/api/simulate/start', { frequencyPerMinute: Number(frequency) });
    setStatus(`Stream started at ${res.data.frequencyPerMinute} incidents/min`);
  };

  const handleStop = async () => {
    await api.post('/api/simulate/stop');
    setStatus('Stream stopped');
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-display text-3xl">Simulation Control Room</h2>
        <p className="text-sm text-steel">Generate synthetic incidents and simulate live streams</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="panel-card p-6 space-y-4">
          <h3 className="font-display text-lg">Batch Generator</h3>
          <label className="text-sm text-steel">Incidents to generate</label>
          <input
            type="number"
            min="1"
            max="200"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="w-full rounded-xl border border-sky px-4 py-2"
          />
          <button
            onClick={handleGenerate}
            className="w-full bg-royal text-white rounded-xl py-2 font-semibold"
          >
            Generate Data
          </button>
        </div>

        <div className="panel-card p-6 space-y-4">
          <h3 className="font-display text-lg">Realtime Stream</h3>
          <label className="text-sm text-steel">Frequency (per minute)</label>
          <input
            type="number"
            min="1"
            max="120"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full rounded-xl border border-sky px-4 py-2"
          />
          <div className="flex gap-3">
            <button onClick={handleStart} className="flex-1 bg-navy text-white rounded-xl py-2 font-semibold">
              Start Stream
            </button>
            <button onClick={handleStop} className="flex-1 bg-white text-navy border border-navy rounded-xl py-2 font-semibold">
              Stop Stream
            </button>
          </div>
        </div>
      </div>

      {status && <div className="panel-card p-4 text-sm text-navy">{status}</div>}
    </div>
  );
}

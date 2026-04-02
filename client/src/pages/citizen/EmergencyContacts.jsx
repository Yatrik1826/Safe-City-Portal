import { useState } from 'react';

const contacts = [
  { title: 'Women Distress', number: '1091' },
  { title: 'Police', number: '100' },
  { title: 'Fire Brigade', number: '101' },
  { title: 'Ambulance', number: '102' },
];

export default function EmergencyContacts() {
  const [copied, setCopied] = useState('');

  const copy = (num) => {
    navigator.clipboard?.writeText(num);
    setCopied(num);
    setTimeout(() => setCopied(''), 1500);
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-display text-3xl">Emergency Contacts</h2>
        <p className="text-sm text-steel">Tap to call or copy critical services.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contacts.map((c) => (
          <div key={c.title} className="panel-card p-6 flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg">{c.title}</h3>
              <p className="text-sm text-steel">{c.number}</p>
            </div>
            <div className="flex gap-2">
              <a className="bg-royal text-white rounded-xl px-4 py-2 text-sm" href={`tel:${c.number}`}>
                Call
              </a>
              <button
                className="bg-white border border-navy text-navy rounded-xl px-4 py-2 text-sm"
                onClick={() => copy(c.number)}
              >
                Copy
              </button>
            </div>
          </div>
        ))}
      </div>

      {copied && <div className="panel-card p-4 text-sm text-navy">Copied {copied}</div>}
    </div>
  );
}

import { useNavigate } from 'react-router-dom';

const tiles = [
  {
    title: 'Record Incident',
    desc: 'Report with details and location.',
    action: 'Start Report',
    path: '/citizen/record',
  },
  {
    title: 'Emergency Contacts',
    desc: 'Call police, ambulance, fire instantly.',
    action: 'View Contacts',
    path: '/citizen/contacts',
  },
  {
    title: 'Explore LiveSafe',
    desc: 'Find nearby safety services now.',
    action: 'Explore',
    path: '/citizen/livesafe',
  },
];

export default function CitizenHome() {
  const navigate = useNavigate();

  return (
    <div className="space-y-10">
      <section className="panel-card p-8 bg-gradient-to-br from-white via-sky to-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl">Citizen Safety Hub</h2>
            <p className="text-sm text-steel mt-2 max-w-xl">
              A calm, guided space to report incidents, reach emergency contacts, and locate nearby support.
            </p>
          </div>
          <div className="panel-card p-4 bg-white/80">
            <p className="text-xs text-steel">Status</p>
            <p className="text-lg font-semibold text-navy">Connected</p>
            <p className="text-xs text-steel mt-1">Location + services active</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiles.map((tile) => (
          <div key={tile.title} className="panel-card p-6 flex flex-col justify-between">
            <div>
              <h3 className="font-display text-lg">{tile.title}</h3>
              <p className="text-sm text-steel mt-2">{tile.desc}</p>
            </div>
            <button
              onClick={() => navigate(tile.path)}
              className="mt-6 bg-royal text-white rounded-xl px-4 py-2 text-sm font-semibold"
            >
              {tile.action}
            </button>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="panel-card p-6">
          <h3 className="font-display text-xl">What to do first</h3>
          <ol className="mt-3 text-sm text-steel list-decimal list-inside space-y-2">
            <li>Use Emergency Contacts if you need immediate help.</li>
            <li>Record the incident to log it in the system.</li>
            <li>Explore LiveSafe to find nearby assistance.</li>
          </ol>
        </div>
        <div className="panel-card p-6">
          <h3 className="font-display text-xl">Safety Reminder</h3>
          <p className="text-sm text-steel mt-2">
            If you feel unsafe, prioritize getting to a public area or contacting emergency services.
          </p>
        </div>
      </section>
    </div>
  );
}

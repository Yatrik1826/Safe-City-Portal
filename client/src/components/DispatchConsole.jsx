export default function DispatchConsole({ incidents = [] }) {
  return (
    <div className="panel-card p-6">
      <h3 className="font-display text-lg">Active Dispatches</h3>
      <div className="mt-4 space-y-3">
        {incidents.map((incident) => (
          <div key={incident._id} className="rounded-xl border border-sky px-4 py-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-navy capitalize">{incident.category}</p>
              <span className="text-xs uppercase text-steel">{incident.status}</span>
            </div>
            <p className="text-xs text-steel mt-1">Unit: {incident.assignedUnit?.name || 'Pending'}</p>
            <p className="text-xs text-steel">{incident.addressLabel || 'City Sector'}</p>
          </div>
        ))}
        {incidents.length === 0 && <p className="text-sm text-steel">No active dispatches.</p>}
      </div>
    </div>
  );
}

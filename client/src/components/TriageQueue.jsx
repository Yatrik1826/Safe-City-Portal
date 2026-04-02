export default function TriageQueue({ incidents = [], onAssign, onResolve }) {
  return (
    <div className="panel-card p-6">
      <h3 className="font-display text-lg">Incident Triage Queue</h3>
      <div className="mt-4 space-y-3 max-h-64 overflow-y-auto">
        {incidents.map((incident) => (
          <div key={incident._id} className="rounded-xl border border-sky px-4 py-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-navy capitalize">{incident.category}</p>
              <span className="text-xs text-steel">Severity {incident.severity}</span>
            </div>
            <p className="text-xs text-steel mt-1">{incident.addressLabel || 'City Sector'}</p>
            <p className="text-xs text-steel">{new Date(incident.reportedAt).toLocaleString()}</p>
            <div className="mt-2 text-xs text-steel">
              Status: <span className="font-semibold text-navy">{incident.status}</span>
              {incident.assignedUnit?.name && (
                <span className="ml-2">Unit: {incident.assignedUnit.name}</span>
              )}
            </div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => onAssign?.(incident._id)}
                className="bg-royal text-white rounded-lg px-3 py-1 text-xs"
              >
                Assign Unit
              </button>
              <button
                onClick={() => onResolve?.(incident._id)}
                className="bg-white border border-navy text-navy rounded-lg px-3 py-1 text-xs"
              >
                Mark Resolved
              </button>
            </div>
          </div>
        ))}
        {incidents.length === 0 && <p className="text-sm text-steel">No incidents in queue.</p>}
      </div>
    </div>
  );
}

export default function AlertList({ alerts = [] }) {
  return (
    <div className="panel-card p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg">Live Alerts</h3>
        <span className="text-xs text-steel">Auto-updating</span>
      </div>
      <div className="mt-4 space-y-3 max-h-64 overflow-y-auto">
        {alerts.length === 0 && (
          <p className="text-sm text-steel">No live alerts right now.</p>
        )}
        {alerts.map((alert) => (
          <div key={alert._id} className="rounded-xl border border-sky bg-white/60 px-4 py-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-navy">{alert.assignedUnit?.name || 'Unit Pending'}</p>
              <span className="text-xs uppercase text-steel">{alert.status}</span>
            </div>
            <p className="mt-2 text-xs text-steel">Response ETA: {Math.round(alert.responseTimeSec / 60)} mins</p>
          </div>
        ))}
      </div>
    </div>
  );
}

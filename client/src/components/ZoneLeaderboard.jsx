export default function ZoneLeaderboard({ areas = [] }) {
  const top = [...areas].sort((a, b) => b.incidentCount - a.incidentCount).slice(0, 5);

  return (
    <div className="panel-card p-6">
      <h3 className="font-display text-lg">Zone Risk Leaderboard</h3>
      <div className="mt-4 space-y-3">
        {top.map((area, idx) => (
          <div key={area.areaName} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-navy">#{idx + 1} {area.areaName}</p>
              <p className="text-xs text-steel">{area.riskLevel.toUpperCase()} risk</p>
            </div>
            <span className="text-xs text-steel">{area.incidentCount} incidents</span>
          </div>
        ))}
        {top.length === 0 && <p className="text-sm text-steel">No zone data yet.</p>}
      </div>
    </div>
  );
}

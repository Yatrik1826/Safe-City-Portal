export default function InsightsPanel({ summary, timeWindows }) {
  const topCategory = summary?.countsByCategory?.sort((a, b) => b.count - a.count)[0];
  const riskyHours = timeWindows?.riskyHours?.slice(0, 3) || [];

  return (
    <div className="panel-card p-6">
      <h3 className="font-display text-lg">Automated Insights</h3>
      <ul className="mt-3 text-sm text-steel space-y-2">
        <li>Top category: {topCategory ? `${topCategory._id} (${topCategory.count})` : 'No data yet'}</li>
        <li>
          Highest risk hours: {riskyHours.length ? riskyHours.map((h) => `${h.hour}:00`).join(', ') : 'No pattern yet'}
        </li>
        <li>System status: Stable analytics pipeline</li>
      </ul>
    </div>
  );
}

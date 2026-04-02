const toneMap = {
  navy: 'text-navy',
  royal: 'text-royal',
  alert: 'text-alert',
  steel: 'text-steel',
};

export default function StatCard({ title, value, trend, tone = 'navy' }) {
  return (
    <div className="panel-card p-5">
      <p className="text-xs uppercase tracking-widest text-steel">{title}</p>
      <div className="mt-3 flex items-end justify-between">
        <h3 className={`font-display text-3xl ${toneMap[tone] || toneMap.navy}`}>{value}</h3>
        {trend && <span className="text-sm text-emerald-500">{trend}</span>}
      </div>
    </div>
  );
}

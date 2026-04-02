export default function AdminFilters({ value, onChange }) {
  return (
    <div className="panel-card p-4 flex flex-wrap items-center gap-3">
      <div>
        <p className="text-xs text-steel">Time Range</p>
        <select
          value={value.range}
          onChange={(e) => onChange({ ...value, range: e.target.value })}
          className="mt-1 rounded-xl border border-sky px-3 py-2 text-sm"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>
      <div>
        <p className="text-xs text-steel">Category</p>
        <select
          value={value.category}
          onChange={(e) => onChange({ ...value, category: e.target.value })}
          className="mt-1 rounded-xl border border-sky px-3 py-2 text-sm"
        >
          <option value="all">All</option>
          <option value="harassment">Harassment</option>
          <option value="theft">Theft</option>
          <option value="assault">Assault</option>
          <option value="stalking">Stalking</option>
        </select>
      </div>
    </div>
  );
}

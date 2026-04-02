export default function PredictionPanel({ prediction, windows }) {
  return (
    <div className="panel-card p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg">AI-lite Prediction</h3>
        <span className="text-xs text-steel">Rule-based</span>
      </div>
      {prediction ? (
        <div className="mt-4 space-y-3">
          <p className="text-sm text-steel">{prediction.explanation}</p>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-sky p-3">
              <p className="text-xs text-steel">Risk Level</p>
              <p className="font-semibold text-navy capitalize">{prediction.riskLevel}</p>
            </div>
            <div className="rounded-xl border border-sky p-3">
              <p className="text-xs text-steel">Incidents (30d)</p>
              <p className="font-semibold text-navy">{prediction.incidentCount30d}</p>
            </div>
            <div className="rounded-xl border border-sky p-3">
              <p className="text-xs text-steel">Incidents (7d)</p>
              <p className="font-semibold text-navy">{prediction.incidentCount7d}</p>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-steel">Unsafe Hours</p>
            <p className="text-sm text-navy mt-2">
              {prediction.unsafeHours?.length ? prediction.unsafeHours.map((h) => `${h}:00`).join(', ') : 'No dominant risky hours'}
            </p>
          </div>
          {windows && (
            <div>
              <p className="text-xs uppercase tracking-widest text-steel">Citywide Risk Windows</p>
              <p className="text-sm text-navy mt-2">
                {windows.riskyHours?.length
                  ? windows.riskyHours.map((h) => `${h.hour}:00`).join(', ')
                  : 'Baseline stable'}
              </p>
            </div>
          )}
        </div>
      ) : (
        <p className="mt-4 text-sm text-steel">Prediction data loading…</p>
      )}
    </div>
  );
}

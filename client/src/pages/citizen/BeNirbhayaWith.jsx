export default function BeNirbhayaWith() {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-display text-3xl">Be Nirbhaya With</h2>
        <p className="text-sm text-steel">Share safety signals and SOS features.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="panel-card p-6">
          <h3 className="font-display text-lg">SOS Alert / Shake Feature</h3>
          <p className="text-sm text-steel mt-2">Trigger SOS with a shake or quick tap.</p>
          <button className="mt-4 bg-alert text-white rounded-xl px-4 py-2 text-sm font-semibold">
            Enable SOS Mode
          </button>
        </div>
        <div className="panel-card p-6">
          <h3 className="font-display text-lg">Send Location Periodically</h3>
          <p className="text-sm text-steel mt-2">Share your live location with trusted contacts.</p>
          <button className="mt-4 bg-white border border-navy text-navy rounded-xl px-4 py-2 text-sm font-semibold">
            Start Sharing
          </button>
        </div>
        <div className="panel-card p-6">
          <h3 className="font-display text-lg">Self Defence Techniques</h3>
          <p className="text-sm text-steel mt-2">Quick drills and defensive guidance.</p>
          <button className="mt-4 bg-white border border-navy text-navy rounded-xl px-4 py-2 text-sm font-semibold">
            View Tutorials
          </button>
        </div>
      </div>
    </div>
  );
}

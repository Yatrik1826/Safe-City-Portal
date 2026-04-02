export default function AdditionalFeatures() {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-display text-3xl">Additional Features</h2>
        <p className="text-sm text-steel">Contacts, safety tips, and history.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="panel-card p-6">
          <h3 className="font-display text-lg">Contact History</h3>
          <p className="text-sm text-steel mt-2">View past emergency calls and alerts.</p>
          <button className="mt-4 bg-white border border-navy text-navy rounded-xl px-4 py-2 text-sm font-semibold">
            View History
          </button>
        </div>
        <div className="panel-card p-6">
          <h3 className="font-display text-lg">Add Contacts</h3>
          <p className="text-sm text-steel mt-2">Save trusted contacts for SOS sharing.</p>
          <button className="mt-4 bg-white border border-navy text-navy rounded-xl px-4 py-2 text-sm font-semibold">
            Add Contacts
          </button>
        </div>
        <div className="panel-card p-6">
          <h3 className="font-display text-lg">Safety Tips</h3>
          <p className="text-sm text-steel mt-2">Daily safety advice and awareness.</p>
          <button className="mt-4 bg-white border border-navy text-navy rounded-xl px-4 py-2 text-sm font-semibold">
            View Tips
          </button>
        </div>
      </div>
    </div>
  );
}

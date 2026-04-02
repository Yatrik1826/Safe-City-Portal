import { jsPDF } from 'jspdf';
import api from '../services/api.js';

const formatDate = (d) => new Date(d).toLocaleString();

export default function ReportExport() {
  const handleExport = async () => {
    const res = await api.get('/api/reports/snapshot');
    const data = res.data;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Nirbhaya Safe City - Analytics Snapshot', 14, 20);
    doc.setFontSize(10);
    doc.text(`Generated: ${formatDate(data.generatedAt)}`, 14, 28);

    doc.setFontSize(12);
    doc.text('Category Counts', 14, 40);
    let y = 48;
    data.countsByCategory.forEach((c) => {
      doc.text(`${c._id}: ${c.count}`, 16, y);
      y += 6;
    });

    y += 6;
    doc.text('Top Risk Areas', 14, y);
    y += 8;
    data.topRiskAreas.forEach((a) => {
      doc.text(`${a.areaName} - ${a.riskLevel} (${a.incidentCount})`, 16, y);
      y += 6;
    });

    doc.save('nirbhaya-analytics-snapshot.pdf');
  };

  return (
    <button
      onClick={handleExport}
      className="bg-white text-navy border border-navy rounded-xl px-4 py-2 text-sm font-semibold"
    >
      Export PDF Snapshot
    </button>
  );
}

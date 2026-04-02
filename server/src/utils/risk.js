const computeRiskLevel = (incidentCount, recentWeight = 1) => {
  const score = incidentCount * 1.5 + recentWeight * 3;
  if (score >= 15) return { riskLevel: 'high', riskScore: score };
  if (score >= 7) return { riskLevel: 'medium', riskScore: score };
  return { riskLevel: 'low', riskScore: score };
};

module.exports = { computeRiskLevel };

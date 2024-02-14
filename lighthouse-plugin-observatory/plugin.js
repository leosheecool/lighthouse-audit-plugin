export default {
  audits: [{ path: "lighthouse-plugin-observatory/ObservatoryAudit.js" }],

  category: {
    title: "Observatory",
    description:
      "Overall score is an indicator and is not the real Observatory score. " +
      `Check the "Observatory Score" to get the real score (Max 135).`,
    auditRefs: [{ id: "observatory-results", weight: 1 }]
  }
};

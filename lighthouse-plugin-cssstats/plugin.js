export default {
  audits: [{ path: "lighthouse-plugin-cssstats/CSSStatsAudit.js" }],

  category: {
    title: "CSS stats",
    description: `CSS stats results`,
    auditRefs: [{ id: "cssstats-results", weight: 1 }]
  }
};

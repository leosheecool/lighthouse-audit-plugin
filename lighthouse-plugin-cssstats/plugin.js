import generateYellowLabsAudits from "./lib/generateAudits.js";

export default {
  audits: [
    { path: "lighthouse-plugin-cssstats/CSSStatsAudit.js" },
    ...Array.from({ length: await generateYellowLabsAudits() })
      .fill(0)
      .map((_, i) => ({
        path: `lighthouse-plugin-cssstats/audits/audits-yellowLabs-${i}.js`
      }))
  ],

  category: {
    title: "CSS stats",
    description: `CSS stats results`,
    auditRefs: [
      { id: "cssstats-results", weight: 1 },
      ...Array.from({ length: global.audits.yellowCSSNb })
        .fill(0)
        .map((_, i) => ({
          id: `yellowLabs-result-${i}`,
          weight: 1
        }))
      // { id: "yellowLabs-results", weight: 1 }
    ]
  }
};

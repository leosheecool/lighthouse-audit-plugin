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
    title: "Style stats",
    description: `Styles audit results`,
    auditRefs: [
      { id: "cssstats-results", weight: 1, group: "cssstats" },
      ...Array.from({ length: global.audits.yellowCSSNb })
        .fill(0)
        .map((_, i) => ({
          id: `yellowLabs-result-${i}`,
          weight: 1,
          group: "yellowLabs"
        }))
    ]
  },

  groups: {
    cssstats: {
      title: "CSS Stats",
      description: "These audits are related to CSS stats."
    },
    yellowLabs: {
      title: "Yellow Labs",
      description: "These audits are related to Yellow Labs."
    }
  }
};

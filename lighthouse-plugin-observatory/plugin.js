import generateAudits from "./lib/generateAudits.js";

export default {
  // audits: Array.from({ length: await generateAudits() })
  //   .fill(0)
  //   .map((_, i) => ({
  //     path: `lighthouse-plugin-observatory/audits/audits-observatory-${i}.js`
  //   })),
  audits: [
    { path: "lighthouse-plugin-observatory/ObservatoryAudit.js" },
    ...Array.from({ length: await generateAudits() })
      .fill(0)
      .map((_, i) => ({
        path: `lighthouse-plugin-observatory/audits/audits-observatory-${i}.js`
      }))
  ],

  category: {
    title: "Mozilla's Observatory",
    description:
      "The displayed score is a percentage of successful tests and is not the real Observatory score. " +
      `Check the "Observatory Overall Score" to get the real score (Max 135).`,
    auditRefs: [
      {
        id: "observatory-overall-results",
        weight: 1,
        group: "observatoryOverallScore"
      },
      ...Array.from({ length: global.audits.observatoryNb })
        .fill(0)
        .map((_, i) => ({
          id: `observatory-result-${i}`,
          weight: 1,
          group: "observatoryDetails"
        }))
    ]
  },

  groups: {
    observatoryOverallScore: {
      title: "Observatory Overall Score",
      description: "These audits are related to Observatory overall score."
    },
    observatoryDetails: {
      title: "Observatory Details",
      description: "These audits are related to Observatory details."
    }
  }
};

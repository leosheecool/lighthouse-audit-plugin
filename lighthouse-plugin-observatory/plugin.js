import generateAudits from "./lib/generateAudits.js";

export default {
  audits: Array.from({ length: await generateAudits() })
    .fill(0)
    .map((_, i) => ({
      path: `lighthouse-plugin-observatory/audits/audits-observatory-${i}.js`
    })),

  category: {
    title: "Observatory",
    description:
      "Overall score is an indicator and is not the real Observatory score. " +
      `Check the "Observatory Score" to get the real score (Max 135).`,
    auditRefs: Array.from({ length: global.audits.observatoryNb })
      .fill(0)
      .map((_, i) => ({
        id: `observatory-result-${i}`,
        weight: 1
      }))
  }
};

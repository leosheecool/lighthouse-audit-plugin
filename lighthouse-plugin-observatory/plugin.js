// import generateAudits from "./lib/generateAudits.js";

import { Audit } from "lighthouse";

// const config = async () => {
//   console.log("Running Observatory plugin");
//   const audits = await generateAudits();

//   return {
//     // audits: [{ path: "lighthouse-plugin-observatory/ObservatoryAudit.js" }],
//     audits: [...audits],

//     category: {
//       title: "Observatory",
//       description:
//         "Overall score is an indicator and is not the real Observatory score. " +
//         `Check the "Observatory Score" to get the real score (Max 135).`,
//       auditRefs: audits.map((audit, i) => ({ id: audit.meta.id, weight: 1 }))
//     }
//   };
// };

// export default config;
// // export default {
// //   audits: [{ path: "lighthouse-plugin-observatory/ObservatoryAudit.js" }],

// //   category: {
// //     title: "Observatory",
// //     description:
// //       "Overall score is an indicator and is not the real Observatory score. " +
// //       `Check the "Observatory Score" to get the real score (Max 135).`,
// //     auditRefs: [{ id: "observatory-results", weight: 1 }]
// //   }
// // };

console.log("Running Observatory plugin");
console.log(...global.audits);
console.log({
  audits: [{ path: "lighthouse-plugin-observatory/audits-observatory.js" }],
  // audits: global.audits.map((AuditClass, i) => ({
  //   // path: AuditClass.meta.id,
  //   implementation: AuditClass
  // })),

  category: {
    title: "Observatory",
    description:
      "Overall score is an indicator and is not the real Observatory score. " +
      `Check the "Observatory Score" to get the real score (Max 135).`,
    auditRefs: global.audits.map((audit, i) => ({
      id: audit.meta.id + i,
      weight: 1
    }))
  }
});

export default {
  // audits: [{ path: "lighthouse-plugin-observatory/ObservatoryAudit.js" }],
  // audits: [{ path: "lighthouse-plugin-observatory/audits-observatory.js" }],
  audits: global.audits.map((AuditClass, i) => ({
    path: `lighthouse-plugin-observatory/audits/audits-observatory-${i}.js`
  })),

  category: {
    title: "Observatory",
    description:
      "Overall score is an indicator and is not the real Observatory score. " +
      `Check the "Observatory Score" to get the real score (Max 135).`,
    auditRefs: global.audits.map((audit, i) => ({
      id: audit.meta.id,
      weight: 1
    }))
  }
};

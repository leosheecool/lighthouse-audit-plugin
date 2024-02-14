import fs from "fs";
import * as chromeLauncher from "chrome-launcher";
import generateAudits from "./lighthouse-plugin-observatory/lib/generateAudits.js";

if (process.argv.length < 2) {
  console.error("Usage: node index.js <url>");
  process.exit(1);
}

const website = process.argv[2];

console.log("\nRunning Lighthouse on", website, "\n");

const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });

const audits = await generateAudits();

global.audits = audits;

console.log("audits");
audits.forEach((audit) => console.log(audit.meta.id));
console.log(typeof audits);

import lighthouse from "lighthouse";

// const options = {
//   logLevel: "info",
//   output: ["html", "json"],
//   onlyCategories: [
//     // "performance",
//     // "accessibility",
//     // "best-practices",
//     // "seo",
//     "lighthouse-plugin-observatory",
//     "lighthouse-plugin-cssstats"
//   ],
//   port: chrome.port,
//   plugins: ["lighthouse-plugin-observatory", "lighthouse-plugin-cssstats"],
//   // audits: [...audits],
//   audits: global.audits.map((AuditClass, i) => ({
//     // path: AuditClass.meta.id,
//     implementation: AuditClass
//   })),
//   categories: {
//     "lighthouse-plugin-observatory": {
//       title: "Observatory",
//       description:
//         "Overall score is an indicator and is not the real Observatory score. " +
//         `Check the "Observatory Score" to get the real score (Max 135).`,
//       auditRefs: audits.map((audit, i) => ({ id: audit.meta.id, weight: 1 }))
//     }
//   }
// };

// console.log(
//   "options",
//   options.categories["lighthouse-plugin-observatory"].auditRefs
// );

const options = {
  logLevel: "info",
  output: ["html", "json"],
  // onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
  onlyCategories: [
    "lighthouse-plugin-observatory",
    "lighthouse-plugin-cssstats"
  ],
  port: chrome.port,
  plugins: ["lighthouse-plugin-observatory", "lighthouse-plugin-cssstats"]
};
const runnerResult = await lighthouse(website, options);

// const results = Object.keys(runnerResult.lhr.categories).map((key) => {
//   const category = runnerResult.lhr.categories[key];
//   return {
//     name: category.title,
//     score: category.score * 100,
//     auditRefs: category.auditRefs.filter((audit) => audit.weight > 0)
//   };
// });

// results.forEach((category) => {
//   const auditDetails = category.auditRefs.map((audit) =>
//     audit.relevantAudits
//       .map((relevantAudit) => runnerResult.lhr.audits[relevantAudit])
//       .filter((audit) => audit.score < 1)
//   );
//   console.log(category.name);
// });

fs.writeFileSync("lhreport_test.json", JSON.stringify(runnerResult.lhr.audits));
fs.writeFileSync(
  "lhreport_categories.json",
  JSON.stringify(runnerResult.lhr.categories)
);
fs.writeFileSync("lhreport_report.html", runnerResult.report[0]);

// `.lhr` is the Lighthouse Result as a JS object
// console.log("Report is done for", runnerResult.lhr.finalDisplayedUrl);
// console.log(
//   "Performance score was",
//   runnerResult.lhr.categories.performance.score * 100
// );

await chrome.kill();

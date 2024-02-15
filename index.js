import fs from "fs";
import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";
import removeAllTempFiles from "./lib/removeAllTempFiles.js";
import ensureDirectoryExistence from "./lib/file.js";

if (process.argv.length < 2) {
  console.error("Usage: node index.js <url>");
  process.exit(1);
}

global.audits = {};
const website = process.argv[2];
const outputDir = `outputs/lhreport-${website
  .replace("https://", "")
  .replace("http://", "")
  .replaceAll("/", "-")}/`;

console.log("\nRunning Lighthouse on", website, "\n");

const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });

const options = {
  logLevel: "info",
  output: ["html", "json", "csv"],
  onlyCategories: [
    "performance",
    "accessibility",
    "best-practices",
    "seo",
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
// });

fs.writeFileSync("lhreport_test.json", JSON.stringify(runnerResult.lhr.audits));
fs.writeFileSync(
  "lhreport_categories.json",
  JSON.stringify(runnerResult.lhr.categories)
);

ensureDirectoryExistence("outputs");
ensureDirectoryExistence(outputDir);

fs.writeFileSync(`${outputDir}/lhreport_report.html`, runnerResult.report[0]);
fs.writeFileSync(`${outputDir}/lhreport_report.csv`, runnerResult.report[2]);

removeAllTempFiles();

await chrome.kill();

console.log("\nLighthouse report generated in", outputDir, "\n");

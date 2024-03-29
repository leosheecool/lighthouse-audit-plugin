import fs from "fs";
import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";
import removeAllTempFiles from "./lib/removeAllTempFiles.js";
import ensureDirectoryExistence from "./lib/file.js";

if (process.argv.length < 2) {
  console.error("Usage: node index.js <url>");
  process.exit(1);
}

const LOADED_CUSTOM_PLUGINS = [
  "lighthouse-plugin-observatory",
  "lighthouse-plugin-cssstats"
];

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
    ...LOADED_CUSTOM_PLUGINS
  ],
  port: chrome.port,
  plugins: LOADED_CUSTOM_PLUGINS
};
const runnerResult = await lighthouse(website, options);

fs.writeFileSync("lhreport_test.json", JSON.stringify(runnerResult.lhr.audits));
fs.writeFileSync(
  "lhreport_categories.json",
  JSON.stringify(runnerResult.lhr.categories)
);

ensureDirectoryExistence("outputs");
ensureDirectoryExistence(outputDir);

fs.writeFileSync(`${outputDir}/lhreport_report.html`, runnerResult.report[0]);
fs.writeFileSync(`${outputDir}/lhreport_report.csv`, runnerResult.report[2]);

removeAllTempFiles(LOADED_CUSTOM_PLUGINS);

await chrome.kill();

console.log("\nLighthouse report generated in", outputDir, "\n");

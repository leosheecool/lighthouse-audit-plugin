import { Audit } from "lighthouse";
import fs from "fs/promises";
import getObservatoryScanResults from "./getObservatoryScanResults.js";

const createAuditsFile = (rule, index) => {
  return `import { Audit } from 'lighthouse';\n\n
  export default class ObservatoryAudit__${rule.name.replaceAll(
    "-",
    "_"
  )} extends Audit {
    static get meta() {
      return {
        id: "observatory-result-${index}",
        title: "${rule.name}",
        failureTitle: "${rule.name} failed",
        description:
          \`${rule.score_description}\`,
        requiredArtifacts: []
      };
    }

    static async audit() {
      return {
        score: ${rule.pass ? 1 : 0},
        scoreDisplayMode: "binary",
        displayValue: "${rule.result.replaceAll("-", " ")}",
      };
    }
  };\n`;
};

const generateAudits = async () => {
  console.log("Running Observatory audits");
  const res = await getObservatoryScanResults(process.argv[2]);

  const files = res.map((rule, i) => createAuditsFile(rule, i));

  const promiseArray = files.map(async (file, i) =>
    fs.writeFile(
      `lighthouse-plugin-observatory/audits/audits-observatory-${i}.js`,
      file
    )
  );

  await Promise.all(promiseArray);

  global.audits.observatoryNb = files.length;

  return files.length;
};

export default generateAudits;

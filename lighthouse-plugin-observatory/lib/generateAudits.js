import getObservatoryScanResults from "./getObservatoryScanResults.js";
import generateAuditFiles from "../../lib/generateAuditFiles.js";

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
  return generateAuditFiles(
    getObservatoryScanResults,
    createAuditsFile,
    `lighthouse-plugin-observatory/audits/`,
    "observatory"
  );
};

export default generateAudits;

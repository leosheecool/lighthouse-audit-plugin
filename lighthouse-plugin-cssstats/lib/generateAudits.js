import getYellowLabsResult from "./getYellowLabsResult.js";
import generateAuditFiles from "../../lib/generateAuditFiles.js";

const getScore = (rule) => {
  if (
    !rule.policy.isOkThreshold ||
    !rule.policy.isAbnormalThreshold ||
    !rule.policy.isBadThreshold
  ) {
    if (rule.bad) return 0.5;
    if (rule.abnormal) return 0;
    return 1;
  }

  if (rule.value <= rule.policy.isOkThreshold) {
    return 1;
  } else if (rule.value <= rule.policy.isBadThreshold) {
    return 0.5;
  } else {
    return 0;
  }
};

const createAuditsFile = (rule, index) => {
  return `import { Audit } from 'lighthouse';\n\n
  export default class YellowLabsAudit__${rule.property.replaceAll(
    "-",
    "_"
  )} extends Audit {
    static get meta() {
      return {
        id: "yellowLabs-result-${index}",
        title: "${rule.policy.label}'s score by YellowLabs",
        failureTitle: "${rule.policy.label}",
        description:
          \`${rule.policy.message}\`,
        requiredArtifacts: ["URL"]
      };
    }

    static async audit() {
      return {
        score: ${getScore(rule)},
        scoreDisplayMode: "numeric",
        // numericValue: ${rule.value},
        // numericUnit: "${rule.policy.unit ?? ""}",
        displayValue: \`${rule.value} ${rule.policy.unit ?? ""}\`,
        details: {
          type: "table",
          headings: [
            { key: "isOkThreshold", itemType: "text", text: "isOkThreshold" },
            { key: "isBadThreshold", itemType: "text", text: "isBadThreshold" },
            { key: "isAbnormalThreshold", itemType: "text", text: "isAbnormalThreshold" },
          ],
          items: [
            { isOkThreshold: "${
              rule.policy.isOkThreshold
            }", isAbnormalThreshold: "${
    rule.policy.isAbnormalThreshold
  }", isBadThreshold: "${rule.policy.isBadThreshold}" }
          ]
        }
      };
    }
  };\n`;
};

const generateYellowLabsAudits = async () => {
  return generateAuditFiles(
    getYellowLabsResult,
    createAuditsFile,
    `lighthouse-plugin-cssstats/audits/`,
    "yellowLabs"
  );
};

export default generateYellowLabsAudits;

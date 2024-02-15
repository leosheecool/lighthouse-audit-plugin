import fs from "fs/promises";
import getYellowLabsResult from "./getYellowLabsResult.js";

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
  console.log("Running YellowLabs audits");
  const res = await getYellowLabsResult(process.argv[2]);

  const files = res.map((rule, i) => createAuditsFile(rule, i));

  const promiseArray = files.map(async (file, i) =>
    fs.writeFile(
      `lighthouse-plugin-cssstats/audits/audits-yellowLabs-${i}.js`,
      file
    )
  );

  await Promise.all(promiseArray);

  global.audits.yellowCSSNb = files.length;
  return files.length;
};

export default generateYellowLabsAudits;

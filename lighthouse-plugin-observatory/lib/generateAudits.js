import { Audit } from "lighthouse";
import fs from "fs/promises";
import getObservatoryScanResults from "./getObservatoryScanResults.js";

const mockedResults = [
  {
    expectation: "csp-implemented-with-no-unsafe",
    name: "content-security-policy",
    output: [Object],
    pass: false,
    result: "csp-not-implemented",
    score_description: "Content Security Policy (CSP) header not implemented",
    score_modifier: -25
  },
  {
    expectation: "hsts-implemented-max-age-at-least-six-months",
    name: "strict-transport-security",
    output: [Object],
    pass: false,
    result: "hsts-implemented-max-age-less-than-six-months",
    score_description:
      "HTTP Strict Transport Security (HSTS) header set to less than six months (15768000)",
    score_modifier: -10
  },
  {
    expectation: "sri-implemented-and-external-scripts-loaded-securely",
    name: "subresource-integrity",
    output: [Object],
    pass: false,
    result: "sri-not-implemented-but-external-scripts-loaded-securely",
    score_description:
      "Subresource Integrity (SRI) not implemented, but all external scripts are loaded over HTTPS",
    score_modifier: -5
  }
];

const createAudits = (rule) => {
  return class ObservatoryAudit extends Audit {
    static get meta() {
      return {
        id: `observatory-result-${rule.name}`,
        title: `${rule.name}'s score by Mozilla Observatory`,
        failureTitle: "The page's score is low by Mozilla Observatory",
        description:
          "Overall score is an indicator and is not the real Observatory score.\n" +
          `Check the "Observatory Score" to get the real score (Max 135).`,
        requiredArtifacts: ["URL"]
      };
    }

    static async audit() {
      return {
        score: rule.pass,
        scoreDisplayMode: "binary"
      };
    }
  };
};

const createAuditsFile = (rule) => {
  return `import { Audit } from 'lighthouse';\n\n
  export default class ObservatoryAudit__${rule.name.replaceAll(
    "-",
    "_"
  )} extends Audit {
    static get meta() {
      return {
        id: "observatory-result-${rule.name}",
        title: "${rule.name}'s score by Mozilla Observatory",
        failureTitle: "The ${
          rule.name
        }'s rule score is low by Mozilla Observatory",
        description:
          "Overall score is an indicator and is not the real Observatory score." +
          "Check the 'Observatory Score' to get the real score (Max 135).",
        requiredArtifacts: ["URL"]
      };
    }

    static async audit() {
      return {
        score: ${rule.pass ? 1 : 0},
        scoreDisplayMode: "binary"
      };
    }
  };\n`;
};

const generateAudits = async () => {
  const res = await getObservatoryScanResults(process.argv[2]);

  // let score = res.score / 100;
  // if (score > 1) score = 1;

  // const auditResult = res.warnings.map((test) => {
  //   return {
  //     id: test.name,
  //     title: test.score_description,
  //     description: `Result: ${test.result}`,
  //     scoreModifier: test.score_modifier,
  //     displayValue: test.result
  //   };
  // });

  const files = res.map((rule) => createAuditsFile(rule));

  console.log(files);

  const promiseArray = files.map(async (file, i) =>
    fs.writeFile(
      `lighthouse-plugin-observatory/audits/audits-observatory-${i}.js`,
      file
    )
  );

  await Promise.all(promiseArray);

  const audits = res.map((rule) => createAudits(rule));
  return audits;
};

export default generateAudits;

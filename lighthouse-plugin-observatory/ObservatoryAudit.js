import { Audit } from "lighthouse";
import getObservatoryScanResults from "./lib/getObservatoryScanResults.js";

class ObservatoryAudit extends Audit {
  static get meta() {
    return {
      id: "observatory-results",
      title: "Page's score by Mozilla Observatory",
      failureTitle: "The page's score is low by Mozilla Observatory",
      description:
        "Overall score is an indicator and is not the real Observatory score.\n" +
        `Check the "Observatory Score" to get the real score (Max 135).`,
      requiredArtifacts: ["URL"]
    };
  }

  static async audit(artifacts) {
    const res = await getObservatoryScanResults(artifacts.URL.mainDocumentUrl);

    let score = res.score / 100;
    if (score > 1) score = 1;

    const auditResult = res.warnings.map((test) => {
      return {
        id: test.name,
        title: test.score_description,
        description: `Result: ${test.result}`,
        scoreModifier: test.score_modifier,
        displayValue: test.result
      };
    });

    return {
      score,
      displayValue: `Observatory score ${res.score}`,
      details: Audit.makeTableDetails(
        [
          { key: "id", itemType: "text", text: "Test Name" },
          { key: "title", itemType: "text", text: "Description" },
          { key: "scoreModifier", itemType: "numeric", text: "Score Modifier" },
          { key: "displayValue", itemType: "text", text: "Result" }
        ],
        auditResult
      )
    };
  }
}

export default ObservatoryAudit;

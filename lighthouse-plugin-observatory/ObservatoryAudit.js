import { Audit } from "lighthouse";

class ObservatoryAudit extends Audit {
  static get meta() {
    return {
      id: "observatory-overall-results",
      title: `Page's score by Mozilla Observatory: ${observatoryScanMetaResponse.score}`,
      failureTitle: `The page's score is low by Mozilla Observatory: ${observatoryScanMetaResponse.score}`,
      description:
        "General informations about the scan run by Mozilla Observatory",
      requiredArtifacts: []
    };
  }

  static async audit() {
    const meta = observatoryScanMetaResponse;

    const test = {
      score: meta.score / 135,
      displayValue: `Observatory score ${meta.score}`,
      details: Audit.makeTableDetails(
        [
          { key: "score", itemType: "numeric", text: "Score" },
          { key: "grade", itemType: "text", text: "Grade" },
          { key: "tests_failed", itemType: "numeric", text: "Tests failed" },
          { key: "tests_passed", itemType: "numeric", text: "Tests passed" },
          {
            key: "tests_quantity",
            itemType: "numeric",
            text: "Tests quantity"
          },
          { key: "end_time", itemType: "text", text: "End time" }
        ],
        {
          score: meta.score,
          grade: meta.grade,
          tests_failed: meta.tests_failed,
          tests_passed: meta.tests_passed,
          tests_quantity: meta.tests_quantity,
          end_time: meta.end_time
        }
      )
    };

    console.log(test);
    return test;
  }
}

export default ObservatoryAudit;

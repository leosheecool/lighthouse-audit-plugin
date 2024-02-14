import { Audit } from "lighthouse";
import getCSSStatsResults from "./lib/getCSSStatsResults.js";

class CSSStatsAudit extends Audit {
  static get meta() {
    return {
      id: "cssstats-results",
      title: "Page's CSS stats",
      failureTitle: "The page's css score is low ",
      description:
        "CSS stats of number of unique colors, unique background colors and total declarations.",
      requiredArtifacts: ["URL"]
    };
  }

  static async audit(artifacts) {
    const res = await getCSSStatsResults(artifacts.URL.mainDocumentUrl);

    let score = res.reduce((a, b) => a + b.displayValue, 0) / res.length;
    if (score > 1) score = 1;

    return {
      score,
      details: Audit.makeTableDetails(
        [
          { key: "title", itemType: "text", text: "Property" },
          { key: "description", itemType: "text", text: "Description" },
          { key: "result", itemType: "text", text: "Result" },
          {
            key: "displayValue",
            itemType: "numeric",
            text: "Display Result"
          },
          { key: "status", itemType: "text", text: "Status" }
        ],
        res
      )
    };
  }
}

export default CSSStatsAudit;

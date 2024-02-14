import getCss from "get-css";
import cssstats from "cssstats";

const PROPERTIES_THRESHOLDS = {
  color: {
    red: 75,
    orange: 30
  },
  "background-color": {
    red: 75,
    orange: 30
  },
  totalDeclarations: {
    red: 10500,
    orange: 4500
  }
};

const PROPERTIES = [
  {
    id: "color",
    title: "Unique Colors",
    description: `Number of unique colors`
  },
  {
    id: "background-color",
    title: "Unique Background Colors",
    description: `Number of unique background colors`
  },
  {
    id: "totalDeclarations",
    title: "Total Declarations",
    description: `Total number of declarations`
  }
];

const getDisplayValue = (number, thresholds) => {
  if (number > thresholds.red) {
    return {
      numeric: 0,
      text: "❌"
    };
  } else if (number > thresholds.orange) {
    return {
      numeric: 0.5,
      text: "🟧"
    };
  } else {
    return {
      numeric: 1,
      text: "✅"
    };
  }
};

const getFormattedResults = (stats) => {
  return PROPERTIES.map((property) => {
    const propertyResult =
      property.id === "totalDeclarations"
        ? stats.declarations.unique
        : stats.declarations.getUniquePropertyCount(property.id);
    const displayValue = getDisplayValue(
      propertyResult,
      PROPERTIES_THRESHOLDS[property.id]
    );

    return {
      ...property,
      result: `${propertyResult}`,
      displayValue: displayValue.numeric,
      status: displayValue.text
    };
  });
};

const getCSSStatsResults = async (url) => {
  const options = {
    timeout: 5000
  };

  const css = await getCss(url, options);
  const stats = await cssstats(css.css);

  return getFormattedResults(stats);
};

export default getCSSStatsResults;

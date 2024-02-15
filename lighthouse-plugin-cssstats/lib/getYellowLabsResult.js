import ylt from "yellowlabtools";

const getYellowLabsResult = async (url) => {
  const results = await ylt(url);

  const rulesArray = Object.keys(results.rules).map((key) => ({
    property: key,
    ...results.rules[key]
  }));
  const formattedResults = rulesArray.filter((test) => test.bad);
  return rulesArray;
};

export default getYellowLabsResult;

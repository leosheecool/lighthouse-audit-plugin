import axios from "axios";

const getObservatoryScanResults = async (url) => {
  url = url.replace("https://", "").replace("http://", "");
  url = url.split("/")[0];

  const response = await axios.post(
    `https://http-observatory.security.mozilla.org/api/v1/analyze?host=${url}`
  );

  const results = await axios.get(
    `https://http-observatory.security.mozilla.org/api/v1/getScanResults?scan=${response.data.scan_id}`
  );

  const data = results.data;
  // const warnings = Object.keys(data)
  //   .filter((key) => data[key].pass === false)
  //   .map((key) => data[key]);

  // const globalResults = {
  //   score: response.data.score,
  //   scanId: response.data.scan_id,
  //   testsPassed: response.data.tests_passed,
  //   testsFailed: response.data.tests_failed,
  //   testsQuantity: response.data.tests_quantity,
  //   likelihoodIndicator: response.data.likelihood_indicator,
  //   warnings
  // };
  // console.log(data);
  console.log(Object.keys(data));
  const test = Object.keys(data).map((key) => data[key]);
  console.log("test", test);
  return test;
};

export default getObservatoryScanResults;

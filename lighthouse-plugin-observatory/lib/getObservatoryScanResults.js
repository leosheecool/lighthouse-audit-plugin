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

  return Object.keys(data).map((key) => data[key]);
};

export default getObservatoryScanResults;

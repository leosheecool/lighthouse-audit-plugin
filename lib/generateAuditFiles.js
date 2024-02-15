import fs from "fs/promises";
import ensureDirectoryExistence from "./file.js";

const generateAudits = async (
  getResFunction,
  createAuditsFile,
  path,
  resourceName
) => {
  console.log(`Generating ${resourceName} audits`);
  const res = await getResFunction(process.argv[2]);
  const files = res.map((rule, i) => createAuditsFile(rule, i));

  ensureDirectoryExistence(path);

  const promiseArray = files.map(async (file, i) =>
    fs.writeFile(`${path}${resourceName}-audit-${i}.js`, file)
  );

  await Promise.all(promiseArray);

  global.audits[resourceName + "Total"] = files.length;

  return files.length;
};

export default generateAudits;

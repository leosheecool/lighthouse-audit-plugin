import fs from "node:fs/promises";
import path from "node:path";

const directories = [
  "lighthouse-plugin-observatory/audits",
  "lighthouse-plugin-cssstats/audits"
];

const removeAllTempFiles = async (activeCustomPlugins) => {
  for (const directory of activeCustomPlugins.map(
    (plugin) => plugin + "/audits"
  )) {
    for (const file of await fs.readdir(directory)) {
      await fs.unlink(path.join(directory, file));
    }
  }
};

export default removeAllTempFiles;

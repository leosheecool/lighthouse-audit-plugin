import fs from "node:fs/promises";
import path from "node:path";

const directories = [
  "lighthouse-plugin-observatory/audits",
  "lighthouse-plugin-cssstats/audits"
];

const removeAllTempFiles = async () => {
  for (const directory of directories) {
    for (const file of await fs.readdir(directory)) {
      if (!file.includes("do-not-delete-folder"))
        await fs.unlink(path.join(directory, file));
    }
  }
};

export default removeAllTempFiles;

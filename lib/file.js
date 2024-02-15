import fs from "fs";

const ensureDirectoryExistence = async (path) => {
  try {
    const dirname = path.replace(/\\/g, "/").replace(/\/[^/]*$/, "");
    fs.mkdirSync(dirname);
  } catch {
    console.log(`Directory ${path} already exists`);
  }
};

export default ensureDirectoryExistence;

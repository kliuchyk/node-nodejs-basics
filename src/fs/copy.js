import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// console.log({
//   __filename,
//   __dirname,
// });

const copy = async () => {
  const src = path.join(__dirname, "files");
  const dest = path.join(__dirname, "files_copy");

  try {
    // 1. Check if source folder exists
    const srcStat = await fs.stat(src).catch(() => null);
    if (!srcStat || !srcStat.isDirectory()) {
      throw new Error("FS operation failed");
    }

    // 2. Check if destination already exists
    const destStat = await fs.stat(dest).catch(() => null);
    if (destStat) {
      throw new Error("FS operation failed");
    }

    // 3. Create destination folder
    await fs.mkdir(dest, { recursive: true });

    // 4. Recursive copy
    await copyDir(src, dest);

    console.log("Folder copied successfully!");
  } catch (err) {
    throw new Error("FS operation failed");
  }
};

const copyDir = async (src, dest) => {
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await fs.mkdir(destPath);
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
};

await copy();

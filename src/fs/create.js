import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const create = async () => {
  const filePath = path.join(__dirname, "files", "fresh.txt");

  try {
    await fs.writeFile(filePath, "I am fresh and young", { flag: "wx" });
    console.log("File created successfully!");
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await create();

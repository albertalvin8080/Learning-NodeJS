import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { access, constants, readFile, writeFile } from "fs/promises";

// __filename and __dirname contain the absolute path 
// (they are automatically provided inside .cjs files)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const jsonPath = join(__dirname, "feed.json");
const conf = { encoding: "utf8"};

// console.log(__dirname);
// console.log(__filename);
// console.log(jsonPath);

export async function getFeed() {
    try {
        await access(jsonPath, constants.F_OK);
    } catch (e) {
        await writeFile(jsonPath, JSON.stringify([]), conf);
    }

    const content = await readFile(jsonPath, conf);
    return JSON.parse(content);
}

export async function saveFeed(feed)
{
    return writeFile(jsonPath, JSON.stringify(feed), conf);
}
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// __filename and __dirname contain the absolute path.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const jsonPath = join(__dirname, "feed.json");

console.log(__dirname);
console.log(__filename);
console.log(jsonPath);
import { getFeeds, saveFeeds } from "./feed-manager.mjs";
import { question, close } from "./cmd.mjs";
import axios from "axios"; // Default exports, don't use '{}'
import Parser from "rss-parser";

let idx = null;
const parser = new Parser();
const feeds = await getFeeds();
let op = await question("Choose\n- list\n- read [idx]\n- add [URL]\n- del [idx]\n- exit\n?: ");

while (op !== "exit") {
    console.log(op);
    op = op.trim().split(" ");
    const param1 = op[0];
    const param2 = op[1];

    console.log();
    switch (param1) {
        case "ls":
        case "list":
            feeds.forEach((url, idx) => console.log(`${idx}: ${url}`));
            break;

        case "add":
            if (!param2) {
                console.log(`-> add [URL]`);
                break;
            }
            feeds.push(param2);
            break;

        case "del":
            if (!param2) {
                console.log(`-> del [idx]`);
                break;
            }

            idx = parseInt(param2, 10);
            if (idx < 0 || idx > feeds.length - 1) {
                console.log(`-> [idx] must lie between 0 and ${feeds.length - 1}`);
                break;
            }
            const deleted = feeds.splice(idx, 1);
            console.log(`del ${deleted}`)
            break;

        case "read":
            if (!param2) {
                console.log(`-> read [idx]`);
                break;
            }

            idx = parseInt(param2, 10);
            if (idx < 0 || idx > feeds.length - 1) {
                console.log(`-> [idx] must lie between 0 and ${feeds.length - 1}`);
                break;
            }

            const url = feeds[idx];
            let {data} = await axios.get(url);

            const feed = await parser.parseString(data);
            feed.items.forEach(item => console.log(item.title));

            break;

        default:
            console.log("What?");
    }
    console.log();

    op = await question("Choose\n- list\n- read [idx]\n- add [URL]\n- del [idx]\n- exit\n?: ");
}

await close();
await saveFeeds(feeds);
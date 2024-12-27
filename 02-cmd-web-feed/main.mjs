import { getFeed, saveFeed } from "./feed-manager.mjs";
import { question, close } from "./cmd.mjs";

const feed = await getFeed();
let op = await question("Choose\n- list\n- add [URL]\n- del [idx]\n- exit\n?: ");

while (op !== "exit") {
    console.log(op);
    op = op.trim().split(" ");
    const param1 = op[0];
    const param2 = op[1];

    console.log();
    switch (param1) {
        case "ls":
        case "list":
            feed.forEach((url, idx) => console.log(`${idx}: ${url}`));
            break;

        case "add":
            if (!param2) {
                console.log(`-> add [URL]`);
                break;
            }
            feed.push(param2);
            break;

        case "del":
            if (!param2) {
                console.log(`-> del [idx]`);
                break;
            }

            const idx = parseInt(param2, 10);
            if (idx < 0 || idx > feed.length - 1) {
                console.log(`-> [idx] must lie between 0 and ${feed.length - 1}`);
                break;
            }
            const deleted = feed.splice(idx, 1);
            console.log(`del ${deleted}`)
            break;

        default:
            console.log("What?");
    }
    console.log();

    op = await question("Choose\n- list\n- add [URL]\n- del [idx]\n- exit\n?: ");
}

await close();
await saveFeed(feed);
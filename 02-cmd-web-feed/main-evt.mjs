import { getFeeds, saveFeeds } from "./feed-manager.mjs";
import { rl } from "./cmd.mjs";
import axios from "axios";
import Parser from "rss-parser";
import EventEmitter from "events";

const parser = new Parser();
const feeds = await getFeeds();
const emitter = new EventEmitter();

function prompt() {
    console.log();
    rl.setPrompt("Choose\n- list\n- read [idx]\n- add [URL]\n- del [idx]\n- exit\n?: ");
    rl.prompt(); // Triggers "line" event on 'rl'.
}

rl.on("line", async (input) => {
    const cmdArgs = input.trim().split(" ");
    emitter.emit(cmdArgs[0], cmdArgs[1]);
});

emitter.on("exit", async () => {
    rl.close();
    await saveFeeds(feeds);
});

function handleInvalidInput(message) {
    console.log(`-> ${message}`);
    prompt();
}

emitter.on("read", async (idx) => {
    if (!idx) {
        handleInvalidInput(`-> read [idx]`);
        return;
    }

    idx = parseInt(idx, 10);
    if (idx < 0 || idx > feeds.length - 1) {
        handleInvalidInput(`-> [idx] must lie between 0 and ${feeds.length - 1}`);
        return;
    }

    const url = feeds[idx];
    let { data } = await axios.get(url);

    const feed = await parser.parseString(data);
    feed.items.forEach(item => console.log(item.title));

    prompt();
});

async function funList() {
    feeds.forEach((feed, idx) => console.log(`${idx}: ${feed}`));
    prompt();
}

emitter.on("ls", funList);
emitter.on("list", funList);

emitter.on("del", async (idx) => {
    if (!idx) {
        handleInvalidInput(`-> del [idx]`);
        return;
    }

    idx = parseInt(idx, 10);
    if (idx < 0 || idx > feeds.length - 1) {
        handleInvalidInput(`-> [idx] must lie between 0 and ${feeds.length - 1}`);
        return;
    }
    const deleted = feeds.splice(idx, 1);
    console.log(`del ${deleted}`);

    prompt();
});

emitter.on("add", async (url) => {
    if (!url) {
        handleInvalidInput(`-> add [URL]`);
        return;
    }
    feeds.push(url);

    prompt();
});

prompt();
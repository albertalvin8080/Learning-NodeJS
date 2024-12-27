import { stdin, stdout } from "process";
import * as readline from "readline";

const rl = readline.createInterface({
    input: stdin,
    output: stdout,
});

export async function question(query) {
    return new Promise(resolve => {
        rl.question(query, resolve);
    });
}

export async function close() {
    rl.close();
}
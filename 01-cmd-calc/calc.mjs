import * as readline from "readline";
import { stdin, stdout } from "process";

const rl = readline.createInterface({
    input: stdin,
    output: stdout,
});

function question(query, rl) {
    return new Promise(resolve => {
        rl.question(query, resolve); // resolve() receives "anwser: string".
    });
}

let op = null;
do {
    op = await question("Enter an operation: ", rl);

    if (op === "exit") {
        rl.close();
        continue;
    }

    try {
        const r = eval(op);
        console.log(r);
    } catch (e) {
        console.log("What?");
    }
} while (op !== "exit");

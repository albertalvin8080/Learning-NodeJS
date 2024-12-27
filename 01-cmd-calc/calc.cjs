const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function question() {
    rl.question("Enter an operation: ", (anwser) => {
        if (anwser === "exit")
            rl.close();

        try {
            const r = eval(anwser);
            console.log(r);
        } catch (e) {
            console.log("What?");
        }
        
        question();
    });
}

question();
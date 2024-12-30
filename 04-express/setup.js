import mongoose from "mongoose";
import dotenv from "dotenv";
import { stdin, stdout } from "process";
import * as readline from "readline";
import { UserModel } from "./app/auth/model.js";
import { hash } from "./app/auth/crypt.js";

dotenv.config();
mongoose.connect(`mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@cluster0.arfjd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);

const rl = readline.createInterface({
    input: stdin,
    output: stdout,
});

rl.question("email: ", (email) =>
{
    rl.question("password: ", async (plainText) =>
    {
        const password = await hash(plainText);
        await UserModel.create({email, password});
        console.log("Ok.");
        
        rl.close();
        mongoose.disconnect();
    });
});
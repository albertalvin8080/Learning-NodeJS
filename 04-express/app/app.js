import express from "express";
import { routes as authorRoutes } from "./author/router.js";

const app = express();

// First param is the baseURL.
app.use("/author", authorRoutes);

export function start()
{
    app.listen(8080, () =>
    {
        console.log(`Server started at http://localhost`);
    });
}
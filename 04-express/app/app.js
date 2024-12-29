import express from "express";
import { routes as authorRoutes } from "./author/router.js";

const app = express();

// WARNING: The order with which you call the app.use()'s below DOES matter.

// Relative to the root of the project.
app.use(express.static("./public"));

// extended: true  -> uses `qs` for parsing the form body.
// extended: false -> uses `querystring` for parsing the form body.
app.use(express.urlencoded({ extended: false }));

// First param is the baseURL.
app.use("/author", authorRoutes);

export function start()
{
    app.listen(8080, () =>
    {
        console.log(`Server started at http://localhost`);
    });
}
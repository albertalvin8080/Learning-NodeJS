import express from "express";
import { routes as authorRoutes } from "./author/routes.js";
import { routes as authenticationRoutes } from "./auth/routes.js";
import session from "express-session";
import { create as createHandlebars } from "express-handlebars";

const app = express();
const hbs = createHandlebars();

/* 
    WARNING: The order with which you call the app.use()'s below DOES matter. 
*/

app.engine("handlebars", hbs.engine); // The view engine to be used.
app.set("view engine", "handlebars"); // Extension of the views (*.handlebars).
app.set("views", "./app/views"); // Location of thw views.

app.use(session({
    secret: "somesecret", // Used to sign the cookie.
    saveUninitialized: false,
    resave: false,
}));

// Take the `user` from session and make acessible to the handlebars (views).
app.use((req, res, next) =>
{
    const user = req.session.user;

    if (user && user.isAuthenticated)
        res.locals.user = user; // Used inside *.handlerbars views.

    next();
});

// App level middleware
const appLevelMiddleware = (req, res, next) =>
{
    console.log("App Middleware: " + req.url);
    next();
};

app.use(appLevelMiddleware);

// Relative to the root of the project.
app.use(express.static("./public"));

// extended: true  -> uses `qs` for parsing the form body.
// extended: false -> uses `querystring` for parsing the form body.
app.use(express.urlencoded({ extended: false }));

app.use("/", authenticationRoutes);

// First param is the baseURL.
app.use("/author", authorRoutes);

export function start()
{
    app.listen(8080, () =>
    {
        console.log(`Server started at http://localhost`);
    });
}
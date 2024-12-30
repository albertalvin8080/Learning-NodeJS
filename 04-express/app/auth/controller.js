// import { view } from "./view.js";

export async function login(req, res)
{
    // res.send(
    //     view("form")
    // );
    res.render("auth/form", {title: "Authors"});
}

export async function authenticate(req, res)
{
    const { email, pwd } = req.body;

    if (!email || !pwd)
    {
        res.redirect("/login");
        return;
    }

    if (email !== "f" || pwd !== "f")
    {
        res.redirect("/login");
        return;
    }

    req.session.user = {
        email,
        isAuthenticated: true,
    }
    res.redirect("/author");
}

// Method level middleware
export async function checkAuthMiddleware(req, res, next)
{
    console.log("Method Middleware: " + req.url);
    const authenticate = req.session.user && req.session.user.isAuthenticated;

    if (!authenticate)
    {
        res.redirect("/login");
        return;
    }

    next();
}

export async function logout(req, res)
{
    req.session.destroy();
    res.redirect("/login");
}
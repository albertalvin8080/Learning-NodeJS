import { UserModel } from "./model.js";
import { compare } from "./crypt.js";

export async function login(req, res)
{
    res.render("auth/form", { title: "Login", layout: "login" });
}

export async function authenticate(req, res)
{
    const { email, pwd } = req.body;

    if (!email || !pwd)
    {
        res.redirect("/login");
        return;
    }

    const user = await UserModel.findOne({ email });

    const compared = await compare(pwd, user.password);
    if (email !== user.email || !compared)
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
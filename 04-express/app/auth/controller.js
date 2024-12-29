import { view } from "./view.js";

export async function login(req, res)
{
    res.send(
        view("form")
    );
}

export async function authenticate(req, res)
{
    const { email, pwd } = req.body;

    if (!email || !pwd)
    {
        res.redirect("/login");
        return;
    }

    if (email !== "franz" || pwd !== "1")
    {
        res.redirect("/login");
        return;
    }

    res.redirect("/author");
}
import * as model from "./model.js";
import { view } from "./view.js";

export async function getAll(req, res) 
{
    const authors = await model.getAll();

    res.send(
        view("list", { authors })
    );
}

export async function getByAge(req, res)
{
    const age = req.params.age;

    let authors = await model.getByAge(parseInt(age, 10));

    if (authors)
        res.send(authors);
    else
        res.sendStatus(404);
}

export async function getById(req, res)
{
    const id = req.params.id;

    let author = await model.getById(parseInt(id, 10));

    if (author)
        res.send(
            view("details", { author })
        );
    else
        res.sendStatus(404);
}

export async function createAuthor(req, res)
{
    res.send(
        view("form", {})
    );
}

export async function storeAuthor(req, res)
{
    console.log(req.url);
    const { a_name, a_age } = req.body;
    const saved = await model.save({ name: a_name, age: parseInt(a_age, 10) });

    res.redirect(
        `/author/id/${saved.id}`
    );
}

export async function updateAuthorGET(req, res)
{
    console.log(req.url);

    const id = parseInt(req.params.id, 10);
    if (!id)
    {
        res.sendStatus(404);
        return;
    }

    // This may seem reundant but it's actually better with regard to computational costs.
    const author = await model.getById(id);
    if (!author)
    {
        res.sendStatus(404);
        return;
    }

    res.send(
        view("form", {author, update: true})
    );
}

export async function updateAuthorPOST(req, res)
{
    console.log(req.url);

    const id = parseInt(req.params.id, 10);
    if (!id)
    {
        res.sendStatus(404);
        return;
    }

    // This may seem reundant but it's actually better with regard to computational costs.
    const author = await model.getById(id);
    if (!author)
    {
        res.sendStatus(404);
        return;
    }

    const {a_name, a_age} = req.body;
    if(!a_name || !a_age)
    {
        res.redirect(`/author/update/${id}`);
        return;
    }

    author.name = a_name;
    author.age = parseInt(a_age, 10);

    await model.update(author);

    res.redirect(`/author/id/${id}`);
}

export async function deleteAuthor(req, res)
{
    const id = parseInt(req.params.id, 10);
    if (!id)
    {
        res.sendStatus(404);
        return;
    }

    // This may seem reundant but it's actually better with regard to computational costs.
    const author = await model.getById(id);
    if (!author)
    {
        res.sendStatus(404);
        return;
    }

    await model.deleteById(id);
    res.redirect("/author");
} 
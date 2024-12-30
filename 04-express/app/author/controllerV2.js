import * as model from "./modelV2.js";

export async function getAll(req, res) 
{
    let authors = await model.getAll();
    authors = authors.map(model.docToObj);

    res.render("author/list", { authors, title: "Authors" });
}

export async function getByAge(req, res)
{
    const age = req.params.age;

    let authors = await model.getByAge(parseInt(age, 10));
    authors = authors.map(model.docToObj);

    if (authors)
        res.render("author/list", { authors, title: "Authors by Age" })
    else
        res.sendStatus(404);
}

export async function getById(req, res)
{
    const id = req.params.id;

    if (!model.isIdValid(id))
    {
        res.sendStatus(404);
        return;
    }

    let author = await model.getById(id);
    author = model.docToObj(author);

    if (author)
        res.render("author/details", { author, title: "Details" });
    else
        res.sendStatus(404);
}

export async function createAuthor(req, res)
{
    res.render("author/form", { title: "Create Author", update: false });
}

export async function storeAuthor(req, res)
{
    console.log(req.url);
    const { a_name, a_age } = req.body;

    if (!a_name || !a_age)
    {
        res.redirect("/author/create");
        return;
    }

    const saved = await model.save({ name: a_name, age: parseInt(a_age, 10) });

    res.redirect(
        `/author/id/${saved._id}`
    );
}

export async function updateAuthorGET(req, res)
{
    console.log(req.url);

    const id = req.params.id;
    if (!model.isIdValid(id))
    {
        res.sendStatus(404);
        return;
    }

    // This may seem reundant but it's actually better with regard to computational costs.
    let author = await model.getById(id);
    if (!author)
    {
        res.sendStatus(404);
        return;
    }

    author = model.docToObj(author);
    res.render("author/form", { author, update: true, title: "Update Author" });
}

export async function updateAuthorPOST(req, res)
{
    console.log(req.url);

    const id = req.params.id;
    if (!model.isIdValid(id))
    {
        res.sendStatus(404);
        return;
    }

    const { a_name, a_age } = req.body;
    if (!a_name || !a_age)
    {
        res.redirect(`/author/update/${id}`);
        return;
    }

    let author = { id: id, name: a_name, age: parseInt(a_age, 10) };
    console.log(author);
    await model.update(author);

    res.redirect(`/author/id/${id}`);
}

export async function deleteAuthor(req, res)
{
    const id = req.params.id;
    if (!model.isIdValid(id))
    {
        res.sendStatus(404);
        return;
    }

    await model.deleteById(id);
    res.redirect("/author");
} 
import * as model from "./model.js";

export async function getAll(req, res) 
{
    res.send(await model.getAll());
}

export async function getByAge(req, res)
{
    const age = req.params.age;
    console.log(age);

    let author = await model.getByAge(parseInt(age, 10));

    if (author)
        res.send(author);
    else
        res.sendStatus(404);
}

export async function getById(req, res)
{
    const id = req.params.id;
    console.log(id);

    let authors = await model.getById(parseInt(id, 10));

    if (authors)
        res.send(authors);
    else
        res.sendStatus(404);
}
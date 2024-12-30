import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

const Author = mongoose.model("Author", authorSchema);

// ----------------------------------------------------
async function test()
{
    const authors = await Author.find();
    if (authors.length !== 0)
        return;

    const author = new Author({
        name: "Franz Bonaparta",
        age: 37,
    });
    author.save();
}
test();
// ----------------------------------------------------

export async function getAll()
{
    return await Author.find();
}

export async function getById(id)
{
    return await Author.findById(id);
}

export async function getByAge(age)
{
    return await Author.find({ age: age });
}

export async function save(author)
{
    return await Author.create(author);
}

export async function update(author)
{
    const stored = await Author.findById(author.id);
    if(!stored)
        return;

    stored.name = author.name;
    stored.age = author.age;
    stored.save();
}

export async function deleteById(id)
{
    await Author.deleteOne({ _id: id });
}

export function isIdValid(id)
{
    try
    {
        return id.length === 24;
    } catch (e)
    {
        console.error(e);
        return false;
    }
}

export function docToObj(author)
{
    return { id: author._id, name: author.name, age: author.age };
}
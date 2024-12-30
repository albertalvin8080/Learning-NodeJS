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
    return Author.find();
}

export async function getById(id)
{
    try
    {
        return Author.findById(id);
    } catch (e)
    {
        console.log(e);
        return Promise.resolve(null);
    }
}

export async function getByAge(age)
{
}

export async function save(author)
{
}

export async function update(author)
{
}

export async function deleteById(id)
{
}
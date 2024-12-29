let id = 0;

function newId()
{
    return ++id;
}

const authors = [
    { id: newId(), name: "Helmuth Voss", age: 39 },
    { id: newId(), name: "Franz Bonaparta", age: 27 },
    { id: newId(), name: "Jakub Farobek", age: 51 },
    { id: newId(), name: "Emil Sébe", age: 34 },
    { id: newId(), name: "Klaus Poppe", age: 45 },
];

export async function getAll()
{
    return Promise.resolve(authors);
}

export async function getById(id)
{
    return Promise.resolve(authors.find(a => a.id === id));
}

export async function getByAge(age)
{
    return Promise.resolve(authors.filter(a => a.age === age));
}

export async function save(author)
{
    const newAuthor = { id: newId(), name: author.name, age: author.age };
    authors.push(newAuthor);
    return Promise.resolve(newAuthor);
}

export async function update(author)
{
    // NOTE: We're using in memory references, so at this point the author is already updated.
    return Promise.resolve(author);
}
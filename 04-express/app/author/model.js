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

export function getAll()
{
    return Promise.resolve(authors);
}

export function getById(id)
{
    return Promise.resolve(authors.find(a => a.id === id));
}

export function getByAge(age)
{
    return Promise.resolve(authors.filter(a => a.age === age));
}

export function save({ name, age })
{
    authors.push({ id: newId(), name, age });
}
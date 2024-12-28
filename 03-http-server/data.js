let id = 0;

function newId()
{
    return ++id;
}

const data = [
    { id: newId(), name: "Helmuth Voss", age: 39 },
    { id: newId(), name: "Franz Bonaparta", age: 27 },
    { id: newId(), name: "Jakub Farobek", age: 51 },
    { id: newId(), name: "Emil Sébe", age: 34 },
    { id: newId(), name: "Klaus Poppe", age: 45 },
]

export function saveAuthor({name, age})
{
    data.push({name, age, id: newId()});
}

export function deleteAuthor(delId)
{
    const idx = data.findIndex((a) => a.id === delId);
    data.splice(idx, 1);
}

export function getAll()
{
    return `
    <h2>Authors</h2>
    <a href="/add">add</a>
    <ul>
        ${data.map(a => `<li><a href="?id=${a.id}">${a.name} - ${a.age}</a></li>`).join("")}
    </ul>
    `;
}

export function getAuthor(id)
{
    const author = data.find(a => a.id == id);
    return `
    <a href="/">Home</a>
    <ul>
        <li>name: ${author.name}</li>
        <li>age: ${author.age}</li>
    </ul>
    <a href="/delete/${author.id}">delete</a>
    `;
}

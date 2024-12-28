import { createServer } from "http";
import { default as constAuthors } from "./authors.js";
// npm run dev

let authors = constAuthors;

const server = createServer((request, response) =>
{
    response.writeHead(200, { "Content-Type": "text/html;charset=utf8" });

    const urlStr = request.url;
    console.log(urlStr);

    const url = new URL(urlStr, `http://localhost:${server.address().port}`);
    const id = url.searchParams.get("id");

    const parts = urlStr.split("/");

    let body = null;

    const delId = parts[2];
    // /delete/{id}
    if (parts.includes("delete") && delId)
    {
        body = handleDelete(delId);
    } 
    else
    {
        body = id ? getAuthor(id) : getAll(authors);
    }

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Authors</title>
    </head>
    <body>
        ${body}
    </body>
    </html>
    `;

    response.end(html);
});

function handleDelete(delId)
{
    delId = parseInt(delId, 10);
    authors = authors.filter((a) => a.id !== delId);
    return getAll(authors);
}

function getAuthor(id)
{
    const author = authors.find(a => a.id == id);
    return `
    <a href="/">Home</a>
    <ul>
        <li>name: ${author.name}</li>
        <li>age: ${author.age}</li>
    </ul>
    `;
}

function getAll(authors)
{
    return `
    <h2>Authors</h2>
    <ul>
        ${authors.map(a => `<li><a href="?id=${a.id}">${a.name} - ${a.age}</a></li>`).join("")}
    </ul>
    `;
}

server.listen(8080, () =>
{
    console.log(`Server listening at http://localhost:${server.address().port}`);
});
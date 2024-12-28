import { createServer } from "http";
import * as data from "./data.js";
import { view, addForm } from "./content.js";
import { parse } from "querystring";
// npm run dev

const server = createServer((request, response) =>
{
    console.log(request.url);
    const parts = request.url.split("/");

    if (request.method === "POST")
    {
        handlePOST(request, response, parts);
        return;
    }

    if (request.method === "GET")
    {
        handleGET(request, response, parts);
        return;
    }

    response.writeHead(405);
    response.end(`Method ${request.method} not allowed.`);
});

function handleGET(request, response, parts)
{
    const urlStr = request.url;
    const url = new URL(urlStr, `http://localhost:${server.address().port}`);
    const id = url.searchParams.get("id");

    // /delete/{id}
    if (parts.includes("delete"))
    {
        const delId = parseInt(parts[2], 10);
        data.deleteAuthor(delId);
        redirect(response, "/");
        return;
    }

    if (parts.includes("add"))
    {
        response.writeHead(200, { "Content-Type": "text/html;charset=utf8" });
        const content = addForm();
        const html = view(content);
        response.end(html);
        return;
    }

    response.writeHead(200, { "Content-Type": "text/html;charset=utf8" });
    const content = id ? data.getAuthor(id) : data.getAll();
    const html = view(content);
    response.end(html);
}

function handlePOST(request, response, parts)
{
    if (parts.includes("save"))
    {
        let body = ``;

        request.on("readable", () =>
        {
            const chunk = request.read();
            if (chunk)
                body += chunk;
        });

        request.on("end", () =>
        {
            const formData = parse(body);
            data.saveAuthor(formData);
            redirect(response, "/");
        });
        return;
    }

    response.writeHead(404);
    response.end("Not Found");
}

function redirect(response, location)
{
    response.writeHead(302, { location: location });
    response.end(`Redirect to ${location}`);
}

server.listen(8080, () =>
{
    console.log(`Server listening at http://localhost:${server.address().port}`);
});
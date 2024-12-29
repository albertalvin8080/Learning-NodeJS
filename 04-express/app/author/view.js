const views = {
    form({ author = { age: "", name: "" }, update = false })
    {
        const title = update ? "Update Author" : "Create Author";
        const url = update ? `/update/${author.id}` : "/store"

        const content = `
        <form action="/author${url}" method="POST">
            <div>
                <label for="a_name">Name:</label>
                <input type="text" id="a_name" name="a_name" value="${author.name}">
            </div>
            <div>
                <label for="a_age">Age:</label>
                <input type="number" id="a_age" name="a_age" value="${author.age}">
            </div>
            <div><button type="submit">Submit</button></div>
        </form>
        `;

        return this._layout({ content, title });
    },
    list({ authors })
    {
        let content = authors
            .map(a => `<li><a href="/author/id/${a.id}">${a.name} - ${a.age}</a></li>`)
            .join("");
        content = `
        <h2>Authors</h2>
        <ul>${content}</ul>
        <a href="/author/create">Create</a>
        `;
        return this._layout({ content });
    },
    details({ author })
    {
        const content = `
        <h2>${author.name}</h2>
        <ul>
            <li>age: ${author.age}</li>
        </ul>
        <a href="/author">Home</a><br>
        <a href="/author/update/${author.id}">Update</a><br>
        `;
        return this._layout({ content, title: author.name });
    },
    _layout({ content, title = "Authors" })
    {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="/assets/css/style.css">
            <title>${title}</title>
        </head>
        <body>
            ${content}
        </body>
        </html>
        `;
    }
};

export const view = (name, data) => views[name](data); 
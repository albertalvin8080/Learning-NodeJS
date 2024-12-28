export function view(content)
{
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Authors</title>
    </head>
    <body>
        ${content}
    </body>
    </html>
    `;
}

export function addForm()
{
    return `
    <form action="/save" method="POST">
    <div>
        <label for="name">Name</label><br>
        <input type="text" id="name" name="name">
    </div>
    <div>
        <label for="age">Age</label><br>
        <input type="number" id="age" name="age">
    </div>
    <div><button type="submit">Submit</button></div>
    </form>
    `;
}
const views = {
    form()
    {
        const content = `
        <h2>Login</h2>
        <form action="/login" method="POST">
            <div>
                <label for="email">Email:</label>
                <input type="text" id="email" name="email">
            </div>
            <div>
                <label for="pwd">Password:</label>
                <input type="password" id="pwd" name="pwd">
            </div>
            <div><button type="submit">Sign In</button></div>
        </form>
        `;

        return this._layout({ content, title: "Login" });
    },
    _layout({ content, title })
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
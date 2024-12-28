import { Router } from "express";

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

export const routes = new Router();

routes.get("/", (req, res) =>
{
    res.send(authors);
});

routes.get("/1", (req, res) =>
{
    res.send(authors[0]);
})
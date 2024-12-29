import { Router } from "express";
import * as controller from "./controller.js";

export const routes = new Router();

// Route level middleware
function routeLevelMiddleware(req, res, next)
{
    console.log("Route Middleware: " + req.url);
    next();
}

// Method level middleware
function checkAuthMiddleware(req, res, next)
{
    console.log("Method Middleware: " + req.url);
    const authenticate = true;

    if (!authenticate)
    {
        res.redirect("/login");
        return;
    }

    next();
}

routes.use(routeLevelMiddleware);

routes.get("/", controller.getAll);
routes.get("/id/:id", controller.getById);
routes.get("/age/:age", controller.getByAge);

routes.get("/create", checkAuthMiddleware, controller.createAuthor);
routes.post("/store", checkAuthMiddleware, controller.storeAuthor);

routes.get("/update/:id", checkAuthMiddleware, controller.updateAuthorGET);
routes.post("/update/:id", checkAuthMiddleware, controller.updateAuthorPOST);

// GET for delete? Seriously?
routes.get("/delete/:id", checkAuthMiddleware, controller.deleteAuthor);
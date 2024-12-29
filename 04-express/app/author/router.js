import { Router } from "express";
import * as controller from "./controller.js";

export const routes = new Router();

routes.get("/", controller.getAll);
routes.get("/id/:id", controller.getById);
routes.get("/age/:age", controller.getByAge);

routes.get("/create", controller.createAuthor);
routes.post("/store", controller.storeAuthor); 

routes.get("/update/:id", controller.updateAuthorGET);
routes.post("/update/:id", controller.updateAuthorPOST); 
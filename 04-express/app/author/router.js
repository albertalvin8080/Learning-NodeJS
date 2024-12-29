import { Router } from "express";
import * as controller from "./controller.js";

export const routes = new Router();

routes.get("/", controller.getAll);

routes.get("/id/:id", controller.getById);
routes.get("/age/:age", controller.getByAge);
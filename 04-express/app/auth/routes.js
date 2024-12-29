import { Router } from "express";
import * as controller from "./controller.js"

export const routes = new Router();

routes.get("/", controller.login);
routes.post("/", controller.authenticate);
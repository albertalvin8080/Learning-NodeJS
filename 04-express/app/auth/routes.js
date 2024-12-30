import { Router } from "express";
import * as controller from "./controllerV2.js"

export const routes = new Router();

routes.get("/login", controller.login);
routes.post("/login", controller.authenticate);

routes.get("/logout", controller.logout);
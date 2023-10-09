import express from "express";

import * as ownersController from "../controllers/ownercontroller.js";

export const ownersRoutes = express.Router();

ownersRoutes.get("/", ownersController.getOwners);

ownersRoutes.get("/atoz", ownersController.getOwnersAlphabetical);

ownersRoutes.get("/:id", ownersController.getOwnerByID);

ownersRoutes.get("/name/:name", ownersController.getOwnersByName);

ownersRoutes.delete("/:id", ownersController.deleteOwnerByID);
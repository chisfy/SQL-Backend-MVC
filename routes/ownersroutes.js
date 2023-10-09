import express from "express";

import * as ownersController from "../controllers/ownercontroller.js";

export const ownersRoutes = express.Router();

ownersRoutes.get("/", ownersController.getOwners);

ownersRoutes.get("/atoz", ownersController.getOwnersAlphabetical);

ownersRoutes.get("/:id", ownersController.getOwnerByID);

ownersRoutes.get("/name/:name", ownersController.getOwnersByName);

ownersRoutes.patch("/:id", ownersController.updateOwnerInformation);

ownersRoutes.delete("/:id", ownersController.deleteOwnerByID);
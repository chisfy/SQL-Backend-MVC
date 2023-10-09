import express from "express";

import * as ownersController from "../controllers/ownercontroller.js";

export const ownersRoutes = express.Router();

ownersRoutes.get("/", ownersController.getOwners);

ownersRoutes.get("/atoz", ownersController.getOwnersAlphabetical);

ownersRoutes.get("/atozsurname", ownersController.getOwnersAlphabeticalSurname);

ownersRoutes.get("/:id", ownersController.getOwnerByID);

ownersRoutes.get("/firstname/:name", ownersController.getOwnersByName);

ownersRoutes.patch("/:id", ownersController.updateOwnerInformation);

ownersRoutes.patch("/", ownersController.assignOwnerToDogs);

ownersRoutes.delete("/:id", ownersController.deleteOwnerByID);

ownersRoutes.post("/", ownersController.addNewOwner);
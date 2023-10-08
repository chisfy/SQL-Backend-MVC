import express from "express";

import * as ownersController from "../controllers/ownercontroller.js";

export const ownersRoutes = express.Router();

ownersRoutes.get("/", ownersController.getOwners);

ownersRoutes.get("/:id", ownersController.getOwnerByID);

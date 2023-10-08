import express from "express";

import * as dogsController from "../controllers/dogcontroller.js";

export const dogsRoutes = express.Router();

dogsRoutes.get("/", dogsController.getDogs);

dogsRoutes.get("/:id", dogsController.getDogByID);

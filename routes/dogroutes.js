import express from "express";

import * as dogsController from "../controllers/dogcontroller.js";

export const dogsRoutes = express.Router();

dogsRoutes.get("/", dogsController.getDogs);

dogsRoutes.get("/atoz", dogsController.getDogsAlphabetical);

dogsRoutes.get("/:id", dogsController.getDogByID);

dogsRoutes.get("/name/:name", dogsController.getDogsByName);

dogsRoutes.delete("/:id", dogsController.deleteDogByID);

dogsRoutes.patch("/:id", dogsController.updateDogInformation);

dogsRoutes.post("/", dogsController.addNewDog);
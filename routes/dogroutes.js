import express from "express";

import * as dogscontroller from "../controllers/dogcontroller.js";

export const dogsRoutes = express.Router();

dogsRoutes.get("/", dogscontroller.getDogs);

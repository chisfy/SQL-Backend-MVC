import express from "express";

import * as dogscontroller from "../controllers/dogcontroller.js";

export const dogsroutes = express.Router();

dogsroutes.get("/", dogscontroller.getDogs);

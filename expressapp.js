// Import relative node packages
import express from "express";
import morgan from "morgan";

// Import the routes.js file
import { dogsRoutes } from "./routes/dogroutes.js";
import { ownersRoutes } from "./routes/ownersroutes.js";

// Store the created express module in a variable
export const app = express();

//Write middle-ware that will console log the stats of each request
app.use(morgan("dev"));
// Write middle -ware that will parse all data into JSON
app.use(express.json());

//Write an express application that will link the routes to an overall path for each table
app.use("/dogs", dogsRoutes);
app.use("/owners", ownersRoutes);

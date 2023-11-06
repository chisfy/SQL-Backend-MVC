// Import relative node packages
import express from "express";
import morgan from "morgan";
import cors from "cors";
import methodOverride from "method-override";

// Import the routes.js file
import { dogsRoutes } from "./routes/dogroutes.js";
import { ownersRoutes } from "./routes/ownersroutes.js";

// Store the created express module in a variable
export const app = express();

///middleware to use cors
app.use(cors());

app.use(cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "PATCH", "DELETE"],
}));
//Write middle-ware that will console log the stats of each request
app.use(morgan("dev"));
// Write middle -ware that will parse all data into JSON
app.use(express.json());
//form-data
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//Write an express application that will link the routes to an overall path for each table
app.use("/dogs", dogsRoutes);
app.use("/owners", ownersRoutes);

// import the express application
import { app } from "./expressapp.js";

//store .env port variable in a variable
const PORT = process.env.PORT;

//use express.js listen method calling the PORT and function to handle what is does with the port i.e. log a message to show it's active
app.listen(PORT, function () {
    console.log(`This server ${PORT} is up and running`);
});

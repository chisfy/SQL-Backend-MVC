// Import pg (from installed pg package)
import pg from "pg";

// Store DB URL into a string - this is retrieving it from the env file
const connectionString = process.env.DB_CONNECTION_URL

//handle an error if the db url is not present or incorrect
if (!connectionString) {
    console.assertError(
      "No DB_CONNECTION_URL defined. Did you load in your env variables?"
    );
  }

//Export an instance that can handle multiple requests (this is where the Postgres SQL table can communicate with this project)
export const pool = new pg.Pool({
// putting the variable we created in here so it knows which database to connect to
    connectionString
});
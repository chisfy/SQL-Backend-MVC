import { pool } from "..db/connections.js";

export async function getOwners() {
// Query the database and return all books

    // Define the SQL query to get all owners from the 'owners' table
    const querySQLText = "SELECT * FROM owners";
    
    // Use the pool object to send the query to the database
    const result = await pool.query(querySQLText);

    // The rows property of the result object contains the retrieved records
    return result.rows
}


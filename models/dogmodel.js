import { pool } from "..db/connection.js";

export async function getDogs() {
// Query the database and return all books

    // Define the SQL query to get all dogs from the 'doga' table
    const querySQLText = "SELECT * FROM dogs";
    
    // Use the pool object to send the query to the database
    const result = await pool.query(querySQLText);

    // The rows property of the result object contains the retrieved records
    return result.rows
}

export async function getDogs() {
// Query the database and return all books
    
    // Define the SQL query to get all dogs from the 'doga' table
    const querySQLText = "SELECT * FROM dogs";
        
    // Use the pool object to send the query to the database
    const result = await pool.query(querySQLText);
    
    // The rows property of the result object contains the retrieved records
    return result.rows
    
}
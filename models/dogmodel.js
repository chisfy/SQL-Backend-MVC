import { pool } from "../db/connection.js";

export async function getDogs() {
  // Query the database and return all books

  // Define the SQL query to get all dogs from the 'doga' table
  const querySQLText = "SELECT * FROM dogs";

  // Use the pool object to send the query to the database
  const result = await pool.query(querySQLText);

  // The rows property of the result object contains the retrieved records
  return result.rows;
}

export async function getDogByID(id) {
  // Query the database and return all books

  // Define the SQL query to get all dogs from the 'doga' table
  const querySQLText = "SELECT * FROM dogs WHERE dog_id = $1";

  // Use the pool object to send the query to the database
  const result = await pool.query(querySQLText, [id]);

  // The rows property of the result object contains the retrieved record or null if not found
  return result.rows[0] || null;
}

export async function getDogsAlphabetical() {
  // Query the database and return all books

  // Define the SQL query to get all dogs from the 'doga' table
  const querySQLText = "SELECT * FROM dogs ORDER BY name ASC";

  // Use the pool object to send the query to the database
  const result = await pool.query(querySQLText);

  // The rows property of the result object contains the retrieved records
  return result.rows;
}

export async function getDogsByName(name) {
  // Query the database and return all books

  // Define the SQL query to get all dogs from the 'doga' table
  const querySQLText = "SELECT * FROM dogs WHERE name = $1 ORDER BY age DESC";

  // Use the pool object to send the query to the database
  const result = await pool.query(querySQLText, [name]);

  // The rows property of the result object contains the retrieved record or null if not found
  return result.rows;
}
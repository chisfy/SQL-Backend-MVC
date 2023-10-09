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

export async function deleteDogByID(id) {
  // Query the database and return all books

  // Define the SQL query to get all dogs from the 'dogs' table
  const querySQLText = "DELETE FROM dogs WHERE dog_id = $1 RETURNING *";

  // Use the pool object to send the query to the database
  const result = await pool.query(querySQLText, [id]);

  // The rows property of the result object contains the retrieved record or null if not found
  return result.rows[0] || null;

}

export async function updateDogInformation(id, newInformation) {
  const queryText = `UPDATE dogs 
  SET name = $1, age = $2, date_of_birth = $3, size = $4, breed = $5 WHERE dog_id = $6 RETURNING *`;
  const values = [newInformation.name, newInformation.age, newInformation.date_of_birth, newInformation.size, newInformation.breed, id];
  const result = await pool.query(queryText, values);
  return result.rows[0] || null;
}
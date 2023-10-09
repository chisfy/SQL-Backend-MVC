import { pool } from "../db/connection.js";

export async function getDogs() {
  // Query the database and return all dogs

  // Define the SQL query to get all dogs from the 'doga' table
  const querySQLText = "SELECT * FROM dogs ORDER BY dog_id ASC";

  // Use the pool object to send the query to the database
  const result = await pool.query(querySQLText);

  // The rows property of the result object contains the retrieved records
  return result.rows;
}

export async function getDogByID(id) {
  //Query the database and find an dog by their id in the path url
  
  // Define the SQL query to get a specific owner from the 'owners' table (paramertized query)
  const querySQLText = "SELECT * FROM dogs WHERE dog_id = $1";

  // Use the pool object to send the query to the database (paramertized query)
  const result = await pool.query(querySQLText, [id]);

  // The rows property of the result object contains the retrieved record or null if not found
  return result.rows[0] || null;
}

export async function getDogsAlphabetical() {
  // Query the database and return all dogs in alphabetical order

  // Define the SQL query to get all dogs from the 'dogs' table order by name ascending
  const querySQLText = "SELECT * FROM dogs ORDER BY name ASC";

  // Use the pool object to send the query to the database
  const result = await pool.query(querySQLText);

  // The rows property of the result object contains the retrieved records
  return result.rows;
}

export async function getDogsByName(name) {
  // Query the database and all dogs under that name in the url

  // Define the SQL query to get all dogs from the 'dogs' table (paramertized query)
  const querySQLText = "SELECT * FROM dogs WHERE name = $1 ORDER BY age DESC";

  // Use the pool object to send the query to the database (paramertized query)
  const result = await pool.query(querySQLText, [name]);

  // The rows property of the result object contains the retrieved record
  return result.rows;
}

export async function deleteDogByID(id) {
  // Query the database and delete dog by their id

  // Define the SQL query to delete dog by ID from the 'dogs' table (paramertized query)
  const querySQLText = "DELETE FROM dogs WHERE dog_id = $1 RETURNING *";

  // Use the pool object to send the query to the database
  const result = await pool.query(querySQLText, [id]);

  // The rows property of the result object contains the retrieved record or null if not found
  return result.rows[0] || null;

}

export async function updateDogInformation(id, newInformation) {
  // Query the database and edit the dogs by their id in the url
  
  // Define the SQL query to update dog by ID from the 'dogs' table (paramertized query)
  const queryText = `UPDATE dogs 
  SET name = $1, age = $2, date_of_birth = $3, size = $4, breed = $5 WHERE dog_id = $6 RETURNING *`;
  
  // parameterized large query by putting it in a array storing that in a variable
  const values = [newInformation.name, newInformation.age, newInformation.date_of_birth, newInformation.size, newInformation.breed, id];
  
  // Use the pool object to send the query to the database (paramertized query)
  const result = await pool.query(queryText, values);

  // The rows property of the result object contains the retrieved record or null if not found
  return result.rows[0] || null;
}

export async function addNewDog(newDog) {
  // Query the database to insert a dog into the dogs table

  // Define the SQL query to insert a row into owners by ID from the 'owners' table (paramertized query)
  const queryText =` INSERT INTO dogs
  (name, age, date_of_birth, size, breed)
  VALUES ($1,$2,$3,$4,$5) RETURNING *`;

  // parameterized large query by putting it in a array storing that in a variable
  const values = [newDog.name, newDog.age, newDog.date_of_birth, newDog.size, newDog.breed];
  console.log(`values=${values}`); // testing the values 
  
  // Use the pool object to send the query to the database (paramertized query)
  const result = await pool.query(queryText, values);
  
  // The rows property of the result object contains the retrieved record or null if not found
  return result.rows[0] || null ;

}

export async function getDogsBySize(size) {
  //Query the database and find a dog by their id in the path url
  
  // Define the SQL query to get all dogs from the 'dogs' table according to the size specified(paramertized query)
  const querySQLText = "SELECT * FROM dogs WHERE size = $1";

  // Use the pool object to send the query to the database (paramertized query)
  const result = await pool.query(querySQLText, [size]);

  // The rows property of the result object contains the retrieved records
  return result.rows;
  
}
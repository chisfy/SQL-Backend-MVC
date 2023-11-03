//import pool vareiable from connection.js to handle all our SQL queries
import { pool } from "../connection.js";

async function resetDatabase() {
  try {
    // dropping all tables that exist
    //await pool.query(`DROP TABLE IF EXISTS dogs_to_owners`);
    await pool.query(`DROP TABLE IF EXISTS owners CASCADE`);
    await pool.query(`DROP TABLE IF EXISTS dogs`);
    console.log("Database reset step 1 of 3 - All tables dropped"); // console log along each query to show successful steps

    // creating new tables
    // owners table = (phone_number is TEXT so the first 0 isn't ignored)
    // console.log('owners table created') // debug logger
    await pool.query(`
    CREATE TABLE owners (
      owner_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      first_name TEXT,
      last_name TEXT,
      address TEXT,
      phone_number TEXT
      );
      `);
    // dogs table
    await pool.query(`
                CREATE TABLE dogs (
                dog_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                name TEXT,
                age INT,
                date_of_birth DATE,
                size TEXT,
                breed TEXT,
                owner_id INT REFERENCES owners(owner_id) ON DELETE CASCADE --
                );
            `);
    // console.log('dogs table created') // debug logger
    // dogs_to_owners table
    // await pool.query(`
    //             CREATE TABLE dogs_to_owners (
    //             dog_id INT REFERENCES dogs(dog_id) ON DELETE CASCADE, 
    //             owner_id INT REFERENCES owners(owner_id) ON DELETE CASCADE,
    //             PRIMARY KEY (dog_id, owner_id)
    //             );
    //         `);
    // // console log along each query to show successful steps // debug logger
    console.log("Database reset step 2 of 3 - New tables created");

    // seeding new tables with
    // seeding dogs table
    await pool.query(`
                INSERT INTO dogs
                (name, age, date_of_birth, size, breed, owner_id)
                VALUES
                ('Max', 4, '2019-06-15', 'Large', 'Golden Retriever', NULL),
                ('Bella', 2, '2021-04-03', 'Small', 'Dachshund', NULL),
                ('Rocky', 5, '2016-11-10', 'Medium', 'Boxer', NULL),
                ('Luna', 3, '2020-01-25', 'Small', 'Shih Tzu', NULL),
                ('Duke', 6, '2017-08-08', 'Large', 'German Shepherd', NULL),
                ('Daisy', 1, '2022-09-12', 'Small', 'Chihuahua', NULL),
                ('Charlie', 7, '2016-05-07', 'Medium', 'Labrador Retriever', NULL),
                ('Rosie', 8, '2014-12-19', 'Small', 'Pomeranian', NULL),
                ('Cooper', 4, '2019-07-02', 'Medium', 'Beagle', NULL),
                ('Ruby', 9, '2014-03-30', 'Small', 'Yorkshire Terrier', NULL);
            `);
    // seeding owner table
    await pool.query(`
                INSERT INTO owners
                (first_name, last_name, address, phone_number)
                VALUES
                ('John', 'Smith', '123 Main Street, London, UK', '020 1234 5678'),
                ('Sarah', 'Johnson', '456 Elm Avenue, Manchester, UK', '0161 987 6543'),
                ('David', 'Wilson', '789 Oak Lane, Birmingham, UK', '0121 555 7890'),
                ('Emily', 'Brown', '101 Pine Road, Edinburgh, UK', '0131 456 7890'),
                ('Michael', 'Davis', '321 Cedar Street, Cardiff, UK', '029 5555 1234');
            `);
    // seeding dog_to_owners table
    // await pool.query(`
    //             INSERT INTO dogs_to_owners
    //             (dog_id, owner_id)
    //             VALUES
    //             (1, 1),
    //             (2, 2),
    //             (3, 3),
    //             (4, 4),
    //             (5, 5),
    //             (6, 1),
    //             (7, 2),
    //             (8, 3),
    //             (9, 4),
    //             (10, 1);
    //         `);
    console.log("Database reset step 3 of 3 - tables populated with data");
    // account for error, perhaps log a message
  } catch (error) {
    console.error("Database reset failed: ", error);
  } finally {
    // closing the connection the pg database to prevent crashing and improve efficiency and performance of the data application.
    await pool.end();
  }
  // database reset confirmation message
  console.log("Database reset complete");
}

await resetDatabase();

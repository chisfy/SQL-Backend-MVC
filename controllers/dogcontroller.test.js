import { test, expect } from "vitest";
import supertest from "supertest";
import { resetDatabase } from "../db/scripts/reset-database";
import { app } from "../expressapp.js"

//variable to get API endpoint
const request = supertest(app);

test("basic skeleton test", () => {});

test("fully testing GET /dogs - checking content and type", async () => {
    //calling the resetDatabase function to clear the database
    await resetDatabase();
    //calling the get method from the request object to get the /dogs endpoint
    const APIresponse = await request.get("/dogs");
    // checking content of body
    console.log(APIresponse.body);
    console.log(APIresponse.header);
    // checking where array is held
    console.log(APIresponse.body["data"]);
    const dogArray = APIresponse.body["data"];

    //asserting 
    expect(dogArray[0]).toMatchObject({
        dog_id: expect.any(Number),
        name: expect.any(String),
        age: expect.any(Number),
        date_of_birth: expect.any(String),
        size: expect.any(String),
        breed: expect.any(String),
        owner_id: null
      });

    // assertion to check data is an array
    expect(dogArray).toHaveLength(10);
    //assertion to check the datatype of body
    expect(APIresponse.body).toBeTypeOf("object");
    //assertion to checking the content type of the response
    expect(APIresponse.header["content-type"]).toBe("application/json; charset=utf-8");
    //assertion to checking the status of the response
    expect(APIresponse.status).toBe(200);
    });
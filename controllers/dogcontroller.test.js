import { test, expect, beforeAll } from "vitest";
import supertest from "supertest";
import { resetDatabase } from "../db/scripts/reset-database";
import { app } from "../expressapp.js"

//variable to get API endpoint
const request = supertest(app);
//basic test check
test("basic skeleton test", () => {});

beforeAll(async () => {
    await resetDatabase();
})

test("fully testing GET /dogs - checking content and type", async () => {
    //calling the get method from the request object to get the /dogs endpoint
    const APIresponse = await request.get("/dogs");
    // // checking content of body
    // console.log(APIresponse.body);
    // // checking content of header
    // console.log(APIresponse.header);
    // // checking where array is held
    // console.log(APIresponse.body["data"]);
    const dogArray = APIresponse.body["data"];

    //asserting the structure of the array
    dogArray.forEach(dog => {
        expect(dog).toMatchObject({
            dog_id: expect.any(Number),
            name: expect.any(String),
            age: expect.any(Number),
            date_of_birth: expect.any(String),
            size: expect.any(String),
            breed: expect.any(String),
            owner_id: null
          });
    });
    // assertion to check data is an array
    expect(dogArray).toHaveLength(10);
    // assertion to check data of apiresponse is an array
    expect(Array.isArray(dogArray)).toStrictEqual(true);
    //assertion to check the datatype of body
    expect(APIresponse.body).toBeTypeOf("object");
    //assertion to checking the content type of the response
    expect(APIresponse.header["content-type"]).toBe("application/json; charset=utf-8");
    //assertion to checking the status of the response
    expect(APIresponse.status).toBe(200);
    expect(APIresponse.body.status).toContain('success');
});

test("testing the delete http method DEL dog by id", async () => {
    // selecting an id
    const id = 2;
    //calling the delete method from the request object to get the /dogs/id endpoint
    const APIresponse = await request.delete(`/dogs/${id}`);
    //checking content of body
    console.log(APIresponse.body)
    //checking content of header
    console.log(APIresponse.header)
    //assertion to check the datatype of body
    expect(APIresponse.body).toBeTypeOf("object");
    //assertion to check for correct data object
    const delDogObj = APIresponse.body["data"];
    expect(delDogObj).toBeTypeOf("object");
    expect(delDogObj).toMatchObject({
        dog_id: expect.any(Number),
        name: expect.any(String),
        age: expect.any(Number),
        date_of_birth: expect.any(String),
        size: expect.any(String),
        breed: expect.any(String),
        owner_id: null
    });
    expect(delDogObj.owner_id).toBeNull();
    //assertion to check for successfull message
    const delMessage = APIresponse.body["msg"];
    expect(delMessage).toBeTypeOf("string");
    expect(delMessage).toStrictEqual('dog removed from database');
    //assertion to checking the content type of the response
    expect(APIresponse.header["content-type"]).toBe("application/json; charset=utf-8");
    //assertion to checking the status of the response
    expect(APIresponse.status).toBe(200);
    expect(APIresponse.body.status).toContain('success');
});

test("testing the delete http method DEL dog by id error handle", async () => {
    // selecting an id tha doesn't exist
    const id = 12;
    //calling the delete method from the request object to get the /dogs/id endpoint
    const APIresponse = await request.delete(`/dogs/${id}`);
    // //checking content of body
    // console.log(APIresponse.body)
    // //checking content of header
    // console.log(APIresponse.header)
    //assertion to check the datatype of body
    expect(APIresponse.body).toBeTypeOf("object");
    //assertion to check for null data
    expect(APIresponse.body["data"]).toBeNull();
    //assertion to check for successfull message
    const delMessage = APIresponse.body["msg"];
    expect(delMessage).toBeTypeOf("string");
    expect(delMessage).toStrictEqual('No dog matched that ID, cannot be deleted');
    //assertion to checking the content type of the response
    expect(APIresponse.header["content-type"]).toBe("application/json; charset=utf-8");
    //assertion to checking the status of the response
    expect(APIresponse.status).toBe(404);
    expect(APIresponse.body.status).toContain('fail');
});

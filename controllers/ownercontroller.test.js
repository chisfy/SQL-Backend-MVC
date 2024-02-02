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

test("tesing POST method on owner db", async () => {
    //creating an object to fulfill the request
    // (first_name, last_name, address, phone_number)
    const responseBody = {
        first_name: "test-firstname",
        last_name: "test-surname",
        address: "123 test test street",
        phone_number: "01234567890"
      };
    //sending over request and body
    const APIresponse = await request.post("/owners").send(responseBody);
    // //checking content of body
    // console.log(APIresponse.body)
    // //checking content of header
    // console.log(APIresponse.header)
    //assertion to check the datatype of body
    expect(APIresponse.body).toBeTypeOf("object");
    //assertion to check for correct data object
    const addDogObj = APIresponse.body["data"];
    expect(addDogObj).toBeTypeOf("object");
    expect(addDogObj).toMatchObject({
        owner_id: expect.any(Number),
        first_name: expect.any(String),
        last_name: expect.any(String),
        address: expect.any(String),
        phone_number: expect.any(String)
      });
    //assertion to check created id is correct
    expect(addDogObj["owner_id"]).toBeTypeOf("number");
    expect(addDogObj["owner_id"]).toBe(6);
    //assertion to check for successfull message
    const addMessage = APIresponse.body["msg"];
    expect(addMessage).toBeTypeOf("string");
    expect(addMessage).toStrictEqual('owner added to the database');
    //assertion to checking the content type of the response
    expect(APIresponse.header["content-type"]).toBe("application/json; charset=utf-8");
    //assertion to checking the status of the response
    expect(APIresponse.body.status).toContain('success');
    expect(APIresponse.status).toBe(201);
})

test("tesing Patch method on owner db assign owner to dog", async () => {
    // variable for dog id and owner id
    const dogID = 2;
    const ownerID = 1;
    //sending over request
    const APIresponse = await request.patch(`/owners/?dog_id=${dogID}&owner_id=${ownerID}`);
    expect(APIresponse.status).toBe(200);
});
import { test, expect } from "vitest";
import supertest from "supertest";
import { app } from "../expressapp.js"

//variable to get API endpoint
const request = supertest(app);

test("basic skeleton test", () => {});


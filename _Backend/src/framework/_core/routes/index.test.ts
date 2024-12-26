import { Router, Request, Response } from "express";
import request from "supertest";
import { root, get, post, getRouter } from "./index";

jest.mock("path", () => ({
  join: jest.fn((...args) => args.join("/")),
}));

jest.mock(
  "../controllers/TestController",
  () => ({
    testAction: jest.fn((req: Request, res: Response) =>
      res.status(200).send("Test Action")
    ),
  }),
  { virtual: true }
);

describe("Routes", () => {
  beforeEach(() => {
    jest.resetModules(); // Reset module cache between tests
  });

  test("root route should map to the correct controller action", async () => {
    root("Test#testAction");
    const app = Router();
    app.use(getRouter());

    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Test Action");
  });

  test("GET route should map to the correct controller action", async () => {
    get("/test", "Test#testAction");
    const app = Router();
    app.use(getRouter());

    const response = await request(app).get("/test");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Test Action");
  });

  test("POST route should map to the correct controller action", async () => {
    post("/test", "Test#testAction");
    const app = Router();
    app.use(getRouter());

    const response = await request(app).post("/test");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Test Action");
  });

  test("should throw error for invalid controller action format", () => {
    expect(() => root("InvalidFormat")).toThrow(
      "Invalid format for controller action: InvalidFormat. Expected format is 'controller#action'."
    );
  });

  test("should throw error if action not found in controller", () => {
    expect(() => get("/", "Test#nonExistentAction")).toThrow(
      "Action nonExistentAction not found in controller Test"
    );
  });
});

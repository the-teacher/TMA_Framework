import request from "supertest";
import express from "express";
import { root, get, post, getRouter, configRouter } from "./index";
import path from "path";

const routes = () => {
  configRouter({
    controllersPath: path.join(__dirname, "./"),
  });

  root("test#indexAction");
  get("/get", "test#getAction");
  post("/post", "test#postAction");

  return getRouter();
};

describe("Routes", () => {
  test("should return the correct response for the root route", async () => {
    const app = express();
    app.use(routes());

    const response = await request(app).get("/");
    expect(response.text).toEqual("Hello Index!");
  });

  test("should return the correct response for the GET /get route", async () => {
    const app = express();
    app.use(routes());

    const response = await request(app).get("/get");
    expect(response.text).toEqual("Hello Get!");
  });

  test("should return the correct response for the POST /post route", async () => {
    const app = express();
    app.use(routes());

    const response = await request(app).post("/post");
    expect(response.text).toEqual("Hello Post!");
  });

  test("should return 404 for an invalid route", async () => {
    const app = express();
    app.use(routes());

    const response = await request(app).get("/invalid");
    expect(response.status).toEqual(404);
  });
});

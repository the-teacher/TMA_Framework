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

export default routes;

describe("Routes", () => {
  test("root route should map to the correct controller action", async () => {
    const app = express();
    app.use(routes());

    const response = await request(app).get("/");
    expect(response.text).toEqual("Hello Index!");
  });

  test("get route should map to the correct controller action", async () => {
    const app = express();
    app.use(routes());

    const response = await request(app).get("/get");
    expect(response.text).toEqual("Hello Get!");
  });

  test("post route should map to the correct controller action", async () => {
    const app = express();
    app.use(routes());

    const response = await request(app).post("/post");
    expect(response.text).toEqual("Hello Post!");
  });

  test("invalid route should return 404", async () => {
    const app = express();
    app.use(routes());

    const response = await request(app).get("/invalid");
    expect(response.status).toEqual(404);
  });
});

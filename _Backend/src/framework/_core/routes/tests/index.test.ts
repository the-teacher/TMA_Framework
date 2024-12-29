import path from "path";
import request from "supertest";
import express from "express";

import {
  root,
  get,
  post,
  getRouter,
  setRouterCotrollersPath,
  resetRouter,
  routeScope as scope,
} from "../index";

describe("Routes", () => {
  beforeEach(() => {
    resetRouter();
    setRouterCotrollersPath(path.join(__dirname, "./test_controllers"));
  });

  describe("Basic routes", () => {
    beforeEach(() => {
      root("test#indexAction");
      get("/get", "test#getAction");
      post("/post", "test#postAction");
    });

    test("should return the correct response for the root route", async () => {
      const app = express();
      app.use(getRouter());

      const response = await request(app).get("/");
      expect(response.text).toBe("Hello Index!");
    });

    test("should return the correct response for the GET route", async () => {
      const app = express();
      app.use(getRouter());

      const response = await request(app).get("/get");
      expect(response.text).toBe("Hello Get!");
    });

    test("should return the correct response for the POST route", async () => {
      const app = express();
      app.use(getRouter());

      const response = await request(app).post("/post");
      expect(response.text).toBe("Hello Post!");
    });
  });

  describe("Scoped routes", () => {
    beforeEach(() => {
      scope("admin", () => {
        get("show", "admin#showAction");
        post("update", "admin#updateAction");
      });
    });

    test("should return correct response for scoped GET route", async () => {
      const app = express();
      app.use(getRouter());

      const response = await request(app).get("/admin/show");
      expect(response.text).toBe("Admin Show!");
    });

    test("should return correct response for scoped POST route", async () => {
      const app = express();
      app.use(getRouter());

      const response = await request(app).post("/admin/update");
      expect(response.text).toBe("Admin Update!");
    });

    test("should return 404 for invalid scoped route", async () => {
      const app = express();
      app.use(getRouter());

      const response = await request(app).get("/admin/invalid");
      expect(response.status).toBe(404);
    });
  });
});

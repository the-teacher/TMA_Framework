import path from "path";

import {
  root,
  get,
  post,
  getRouter,
  configRouter,
} from "@framework-core/routes";

const routes = () => {
  configRouter({
    controllersPath: path.join(__dirname, "../controllers"),
  });

  root("index#index");
  get("/index", "index#index");
  post("/index", "index#index");

  return getRouter();
};

export default routes;

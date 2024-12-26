import { root, get, post, getRouter } from "@framework-core/routes";

// Warning: The order of the routes is important
// Specific routes first
// General routes last
const routes = () => {
  root("index#index");
  get("/index", "index#index");
  post("/index", "index#index");

  return getRouter();
};

export default routes;

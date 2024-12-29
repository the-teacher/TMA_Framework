import { root, get, post, getRouter } from "@framework-core/routes";

root("index#index");
get("/index", "index#index");
post("/index", "index#index");

export default getRouter;

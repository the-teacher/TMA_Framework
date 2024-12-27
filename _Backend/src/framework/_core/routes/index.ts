import { getRouter, setRouterCotrollersPath } from "./routerCore";
import { parseControllerString, loadController } from "./utils";

export const root = (controllerAction: string) => {
  const { controller, action } =
    typeof controllerAction === "string"
      ? parseControllerString(controllerAction)
      : controllerAction;

  getRouter().get("/", loadController(controller, action));
};

export const get = (urlPath: string, controllerAction: string) => {
  const { controller, action } =
    typeof controllerAction === "string"
      ? parseControllerString(controllerAction)
      : controllerAction;

  getRouter().get(urlPath, loadController(controller, action));
};

export const post = (urlPath: string, controllerAction: string) => {
  const { controller, action } =
    typeof controllerAction === "string"
      ? parseControllerString(controllerAction)
      : controllerAction;

  getRouter().post(urlPath, loadController(controller, action));
};

export { getRouter, setRouterCotrollersPath };

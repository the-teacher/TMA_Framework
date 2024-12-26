import { Router } from "express";
import path from "path";

let globalRouter: Router | null = null;

const initRouter = () => {
  if (!globalRouter) {
    globalRouter = Router();
  }
};

const loadController = (controllerName: string, action: string) => {
  const controllerPath = path.join(
    __dirname,
    "../controllers",
    `${controllerName}Controller`
  );
  const controller = require(controllerPath);
  if (controller[action]) {
    return controller[action];
  } else {
    throw new Error(
      `Action ${action} not found in controller ${controllerName}`
    );
  }
};

const parseControllerString = (controllerActionString: string) => {
  const [controller, action] = controllerActionString.split("#");
  if (!controller || !action) {
    throw new Error(
      `Invalid format for controller action: ${controllerActionString}. Expected format is 'controller#action'.`
    );
  }
  return { controller, action };
};

export const root = (controllerAction: string) => {
  initRouter();

  const { controller, action } =
    typeof controllerAction === "string"
      ? parseControllerString(controllerAction)
      : controllerAction;

  globalRouter!.get("/", loadController(controller, action));
};

export const get = (urlPath: string, controllerAction: string) => {
  initRouter();
  // console.log('get', urlPath, controllerAction);
  const { controller, action } =
    typeof controllerAction === "string"
      ? parseControllerString(controllerAction)
      : controllerAction;

  globalRouter!.get(urlPath, loadController(controller, action));
};

export const post = (urlPath: string, controllerAction: string) => {
  initRouter();

  const { controller, action } =
    typeof controllerAction === "string"
      ? parseControllerString(controllerAction)
      : controllerAction;

  globalRouter!.post(urlPath, loadController(controller, action));
};

export const getRouter = () => globalRouter;

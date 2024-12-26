import { Router } from "express";
import path from "path";

let globalRouter: Router = null as unknown as Router;
let controllersPath: string = "../controllers";

// Do we need it?
const initRouter = () => {
  if (!globalRouter) {
    globalRouter = Router();
  }
};

export const configRouter = (config: { controllersPath: string }) =>
  (controllersPath = config.controllersPath);

const requireController = (controllerPath: string) => require(controllerPath);

const buildControllerPath = (controllerName: string) =>
  path.join(controllersPath, `${controllerName}Controller`);

const loadController = (controllerName: string, action: string) => {
  const controllerPath = buildControllerPath(controllerName);
  const controller = requireController(controllerPath);

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

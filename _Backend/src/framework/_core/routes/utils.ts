import path from "path";
import { getRouterCotrollersPath } from "./routerCore";

export const parseControllerString = (controllerActionString: string) => {
  const [controller, action] = controllerActionString.split("#");
  if (!controller || !action) {
    throw new Error(
      `Invalid format for controller action: ${controllerActionString}. Expected format is 'controller#action'.`
    );
  }
  return { controller, action };
};

export const requireController = (controllerPath: string) =>
  require(controllerPath);

export const buildControllerPath = (controllerName: string) =>
  path.join(getRouterCotrollersPath(), `${controllerName}Controller`);

export const loadController = (controllerName: string, action: string) => {
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

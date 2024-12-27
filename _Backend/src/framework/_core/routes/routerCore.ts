import { Router } from "express";

let globalRouter: Router | null = null;
let controllersPath: string = "../controllers";

export const getRouter = () => {
  if (!globalRouter) {
    globalRouter = Router();
  }

  return globalRouter;
};

export const resetRouter = () => {
  globalRouter = null;
  controllersPath = "../controllers";
};

export const setRouterCotrollersPath = (path: string) =>
  (controllersPath = path);

export const getRouterCotrollersPath = () => controllersPath;

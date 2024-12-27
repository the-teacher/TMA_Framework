import { Router } from "express";

export let globalRouter: Router | null = null;
export let controllersPath: string = "../controllers";

export const getRouter = () => {
  if (!globalRouter) {
    globalRouter = Router();
  }

  return globalRouter;
};

export const setRouterCotrollersPath = (path: string) => {
  controllersPath = path;
};

export const getRouterCotrollersPath = () => controllersPath;

import { Request, Response } from "express";

export const indexAction = (req: Request, res: Response) => {
  return res.send("Hello Index!");
};

export const getAction = (req: Request, res: Response) => {
  return res.send("Hello Get!");
};

export const postAction = (req: Request, res: Response) => {
  return res.send("Hello Post!");
};

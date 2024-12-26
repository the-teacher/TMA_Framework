import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import routes from "./framework/routes";

const port = process.env.BACKEND_PORT || 4000;
const app = express();

// Middlewares
const allowedOrigins = ["http://localhost:3000"];

const requestLogger = (request: Request, _: Response, next: NextFunction) => {
  console.log("Request:", request.path, " Params:", request.params);
  next();
};

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(requestLogger);
app.use(cookieParser());
app.use(express.json());
app.use(routes());

// Server run
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
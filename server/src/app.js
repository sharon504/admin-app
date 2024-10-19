import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import middlewares from "#middlewares";

const ROUTE_PREFIX = "/api/v1";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(middlewares.errorHandler);
export default app;

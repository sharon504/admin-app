import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { errorHandler, authHandler } from "#middlewares";

import { roleRouter, userRouter, permissionsRouter } from "#routes";
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

app.use(errorHandler);
app.use(ROUTE_PREFIX + "/user", userRouter);
app.use(ROUTE_PREFIX + "/role", authHandler, roleRouter);
app.use(ROUTE_PREFIX + "/permissions", authHandler, permissionsRouter);

export default app;

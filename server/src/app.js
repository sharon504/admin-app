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
    origin: "http://localhost",
    credentials: true,
  }),
);

app.use(ROUTE_PREFIX + "/user", userRouter);
app.use(ROUTE_PREFIX + "/role", authHandler, roleRouter);
app.use(ROUTE_PREFIX + "/permissions", authHandler, permissionsRouter);
app.use(errorHandler);

export default app;

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

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

// app.use(errorHandler);
export default app;

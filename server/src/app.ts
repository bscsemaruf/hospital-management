import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./app/modules/user/user.routes";
import { adminRoutes } from "./app/modules/admin/admin.routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import router from "./app/routes";
import notFound from "./app/middleware/notFound";
// import { notFound } from "./app/middleware/notFound";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use("/api/v1", router);

app.use(globalErrorHandler);

app.use(notFound);

export default app;

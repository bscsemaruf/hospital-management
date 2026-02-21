import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./app/modules/user/user.routes";
import { adminRoutes } from "./app/modules/admin/admin.routes";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use("/api/v1", userRoutes);
app.use("/api/v1/admins", adminRoutes);

export default app;

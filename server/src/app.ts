import express, { Application } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import router from "./app/routes";
import notFound from "./app/middleware/notFound";
import cookieParser from "cookie-parser";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use("/api/v1", router);

app.use(notFound);

app.use(globalErrorHandler);

export default app;

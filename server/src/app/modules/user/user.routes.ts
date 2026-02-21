import express from "express";
import { userControllers } from "./user.controller";

const router = express.Router();

router.post("/users", userControllers.createAdmin);

export const userRoutes = router;

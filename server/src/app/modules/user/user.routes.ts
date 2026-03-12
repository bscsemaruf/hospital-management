import express from "express";
import { userControllers } from "./user.controller";

import { UserRole } from "../../../generated/prisma/enums";
import auth from "../../middleware/auth";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  userControllers.createAdmin,
);

export const userRoutes = router;

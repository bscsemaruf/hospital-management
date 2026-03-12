import { NextFunction, Request, Response, Router } from "express";
import { adminController } from "./admin.controller";
import validateRequest from "../../../shared/validateRequest";
import { AdminValidation } from "./admin.validation";
import auth from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  adminController.getAllAdmins,
);
router.get(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  adminController.getAdminById,
);
router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(AdminValidation.updateAdmin),
  adminController.updateAdminById,
);
router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  adminController.deleteAdminById,
);
router.delete(
  "/src/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  adminController.softDeleteAdminById,
);

export const adminRoutes = router;

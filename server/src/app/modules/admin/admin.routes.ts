import { NextFunction, Request, Response, Router } from "express";
import { adminController } from "./admin.controller";
import validateRequest from "../../../shared/validateRequest";
import { AdminValidation } from "./admin.validation";

const router = Router();

router.get("/", adminController.getAllAdmins);
router.get("/:id", adminController.getAdminById);
router.patch(
  "/:id",
  validateRequest(AdminValidation.updateAdmin),
  adminController.updateAdminById,
);
router.delete("/:id", adminController.deleteAdminById);
router.delete("/src/:id", adminController.softDeleteAdminById);

export const adminRoutes = router;

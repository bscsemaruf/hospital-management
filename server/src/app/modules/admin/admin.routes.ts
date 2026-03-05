import { Router } from "express";
import { adminController } from "./admin.controller";

const router = Router();

router.get("/", adminController.getAllAdmins);
router.get("/:id", adminController.getAdminById);
router.patch("/:id", adminController.updateAdminById);
router.delete("/:id", adminController.deleteAdminById);
router.delete("/src/:id", adminController.softDeleteAdminById);

export const adminRoutes = router;

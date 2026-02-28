import { Request, Response } from "express";
import { adminService } from "./admin.service";
import { pick } from "../../../shared/pick";
import { adminFilterableFields, paginationFields } from "./admin.constant";

const getAllAdmins = async (req: Request, res: Response) => {
  try {
    const obj = req.query;

    const data = pick(obj, adminFilterableFields);
    const options = pick(obj, paginationFields);

    const result = await adminService.getAllAdmins(data, options);
    res.status(200).json({
      success: true,
      message: "Admins retrived successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.name || "Falied to retirve admins",
      data: err,
    });
  }
};

export const adminController = {
  getAllAdmins,
};

import { Request, Response } from "express";
import { adminService } from "./admin.service";
import { pick } from "../../../shared/pick";

const getAllAdmins = async (req: Request, res: Response) => {
  try {
    const obj = req.query;
    const realFilterData = [
      "searchTerm",
      "name",
      "email",
      "contactNumber",
    ] as const;

    const data = pick(obj, realFilterData);
    const result = await adminService.getAllAdmins(data);
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

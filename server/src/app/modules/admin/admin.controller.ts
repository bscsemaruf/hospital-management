import { Request, Response } from "express";
import { adminService } from "./admin.service";

const getAllAdmins = async (req: Request, res: Response) => {
  try {
    console.log(req.query);
    const result = await adminService.getAllAdmins(req.query);
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

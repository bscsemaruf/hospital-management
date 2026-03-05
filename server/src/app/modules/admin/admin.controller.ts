import { Request, Response } from "express";
import { adminService } from "./admin.service";
import { pick } from "../../../shared/pick";
import { adminFilterableFields, paginationFields } from "./admin.constant";
import { sendResponse } from "../../../shared/sendResponse";

const getAllAdmins = async (req: Request, res: Response) => {
  try {
    const obj = req.query;

    const data = pick(obj, adminFilterableFields);
    const options = pick(obj, paginationFields);

    const result = await adminService.getAllAdmins(data, options);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admins retrived successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.name || "Falied to retirve admins",
      data: err,
    });
  }
};

const getAdminById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await adminService.getAdminById(id as string);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin fetched successfully.",

      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.name || "Something went wrong!",
      error: err,
    });
  }
};

const updateAdminById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await adminService.updateAdminById(id as string, req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin updated successfully.",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.name || "Something went wrong!",
      error: err,
    });
  }
};

const deleteAdminById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await adminService.deleteAdminById(id as string);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin deleted successfully.",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.name || "Something went wrong!",
      error: err,
    });
  }
};

const softDeleteAdminById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await adminService.softDeleteAdminById(id as string);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin deleted successfully.",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.name || "Something went wrong!",
      error: err,
    });
  }
};

export const adminController = {
  getAllAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
  softDeleteAdminById,
};

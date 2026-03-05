import { NextFunction, Request, Response } from "express";
import { adminService } from "./admin.service";
import { pick } from "../../../shared/pick";
import { adminFilterableFields, paginationFields } from "./admin.constant";
import { sendResponse } from "../../../shared/sendResponse";

const getAllAdmins = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
    next(err);
  }
};

const getAdminById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
    next(err);
  }
};

const updateAdminById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
    next(err);
  }
};

const deleteAdminById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
    next(err);
  }
};

const softDeleteAdminById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
    next(err);
  }
};

export const adminController = {
  getAllAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
  softDeleteAdminById,
};

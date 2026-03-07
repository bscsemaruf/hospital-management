import { NextFunction, Request, RequestHandler, Response } from "express";
import { adminService } from "./admin.service";
import { pick } from "../../../shared/pick";
import { adminFilterableFields, paginationFields } from "./admin.constant";
import { sendResponse } from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";

const getAllAdmins = catchAsync(async (req, res) => {
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
});

const getAdminById = catchAsync(async (req, res) => {
  sendResponse;
  const { id } = req.params;
  const result = await adminService.getAdminById(id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin fetched successfully.",
    data: result,
  });
});

const updateAdminById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await adminService.updateAdminById(id as string, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin updated successfully.",
    data: result,
  });
});

const deleteAdminById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await adminService.deleteAdminById(id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin deleted successfully.",
    data: result,
  });
});

const softDeleteAdminById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await adminService.softDeleteAdminById(id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin deleted successfully.",
    data: result,
  });
});

export const adminController = {
  getAllAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
  softDeleteAdminById,
};

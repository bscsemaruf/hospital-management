import { Admin, Prisma } from "../../../generated/prisma/client";
import { calculatePagination } from "../../../helper/pagination";
import { prisma } from "../../../lib/prisma";
import { adminSearchableFields } from "./admin.constant";

const getAllAdmins = async (params: any, options: any) => {
  const { searchTerm, ...restData } = params;
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);

  const filterData: Prisma.AdminWhereInput[] = [];

  if (params.searchTerm) {
    filterData.push({
      OR: adminSearchableFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(restData).length > 0) {
    filterData.push({
      AND: Object.keys(restData).map((field) => ({
        [field]: {
          equals: restData[field],
        },
      })),
    });
  }

  const whereConditions: Prisma.AdminWhereInput = { AND: filterData };
  const result = await prisma.admin.findMany({
    where: whereConditions,
    take: limit,
    skip,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy as string]: sortOrder,
          }
        : { createdAt: "desc" },
  });

  const total = await prisma.admin.count({
    where: whereConditions,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getAdminById = async (id: string) => {
  const result = await prisma.admin.findUniqueOrThrow({
    where: { id },
  });

  return result;
};

const updateAdminById = async (id: string, data: Partial<Admin>) => {
  await prisma.admin.findUniqueOrThrow({
    where: { id },
  });
  const result = await prisma.$transaction(async (tx) => {
    const findData = await tx.admin.update({
      where: { id },
      data,
    });
    return findData;
  });
  return result;
};

const deleteAdminById = async (id: string) => {
  await prisma.admin.findUniqueOrThrow({
    where: { id },
  });
  const result = await prisma.$transaction(async (tx) => {
    const deleteFromAdmin = await tx.admin.delete({
      where: { id },
    });
    await tx.user.delete({
      where: {
        email: deleteFromAdmin.email,
      },
    });
  });
  return result;
};

export const adminService = {
  getAllAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
};

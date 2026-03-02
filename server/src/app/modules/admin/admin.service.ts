import { Prisma } from "../../../generated/prisma/client";
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

export const adminService = {
  getAllAdmins,
};

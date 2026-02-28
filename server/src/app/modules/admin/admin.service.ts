import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../../lib/prisma";

const getAllAdmins = async (params?: any) => {
  const { searchTerm, ...restData } = params;
  const filterData: Prisma.AdminWhereInput[] = [];

  const adminSearchableFields = ["name", "email"];
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
  });
  return result;
};

export const adminService = {
  getAllAdmins,
};

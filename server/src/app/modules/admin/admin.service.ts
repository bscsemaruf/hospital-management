import { prisma } from "../../../lib/prisma";

const getAllAdmins = async (params?: any) => {
  const result = await prisma.admin.findMany({
    where: params.searchTerm
      ? {
          OR: [
            {
              name: {
                contains: params.searchTerm,
                mode: "insensitive",
              },
            },
            {
              email: {
                contains: params.searchTerm,
                mode: "insensitive",
              },
            },
          ],
        }
      : {},
  });
  return result;
};

export const adminService = {
  getAllAdmins,
};

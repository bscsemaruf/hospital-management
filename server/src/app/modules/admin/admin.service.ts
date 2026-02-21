import { prisma } from "../../../lib/prisma";

const getAllAdmins = async () => {
  const result = await prisma.admin.findMany();
  return result;
};

export const adminService = {
  getAllAdmins,
};

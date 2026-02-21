// import { UserRole } from "../../../generated/prisma/enums";
import { UserRole } from "../../../generated/prisma/enums";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcrypt";

const createAdmin = async (data: any) => {
  const hashedPassword: string = await bcrypt.hash(data.password, 12);
  const userData = {
    email: data.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transaction) => {
    await transaction.user.create({
      data: userData,
    });
    const adminCreate = await transaction.admin.create({
      data: data.admin,
    });

    return adminCreate;
  });

  return result;
};

export const userServices = {
  createAdmin,
};

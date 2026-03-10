import { prisma } from "../../../lib/prisma";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtHelper } from "../../../helper/jwtHelper";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: { email: payload.email, status: "ACTIVE" },
  });

  const validPassword = await bcrypt.compare(
    payload.password,
    userData.password,
  );

  if (!validPassword) {
    throw new Error("Password is invalid!");
  }

  const accessToken = jwtHelper.generateToken(
    { email: userData.email, role: userData.role },
    "abcd",
    "5h",
  );
  const refreshToken = jwtHelper.generateToken(
    { email: userData.email, role: userData.role },
    "abcdef",
    "30d",
  );
  //console.log(accessToken);

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshToken = async (payload: string) => {
  let decoded;
  try {
    decoded = jwtHelper.verifyToken(payload, "abcdef");
  } catch (error) {
    throw new Error("You are not authorized!");
  }
  const userData = await prisma.user.findFirstOrThrow({
    where: { email: decoded.email, status: "ACTIVE" },
  });

  const accessToken = jwtHelper.generateToken(
    { email: userData.email, role: userData.role },
    "abcd",
    "5h",
  );

  return {
    accessToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};

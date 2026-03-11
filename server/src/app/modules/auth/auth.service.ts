import { prisma } from "../../../lib/prisma";
import bcrypt from "bcrypt";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { jwtHelper } from "../../../helper/jwtHelper";
import config from "../../../config";

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
    config.jwt.access_secret,
    config.jwt.access_expires_in as any,
  );

  const refreshToken = jwtHelper.generateToken(
    { email: userData.email, role: userData.role },
    config.jwt.refresh_secret,
    config.jwt.refresh_expires_in as any,
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshToken = async (payload: string) => {
  let decoded;
  try {
    decoded = jwtHelper.verifyToken(payload, config.jwt.refresh_secret);
  } catch (error) {
    throw new Error("You are not authorized!");
  }
  const userData = await prisma.user.findFirstOrThrow({
    where: { email: decoded.email, status: "ACTIVE" },
  });

  const accessToken = jwtHelper.generateToken(
    { email: userData.email, role: userData.role },
    config.jwt.access_secret,
    config.jwt.access_expires_in as any,
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

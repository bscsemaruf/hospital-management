import { prisma } from "../../../lib/prisma";
import bcrypt from "bcrypt";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { jwtHelper } from "../../../helper/jwtHelper";
import config from "../../../config";
import senderEmail from "./senderEmail";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: { email: payload.email, status: "ACTIVE" },
  });

  const validPassword = await bcrypt.compare(
    payload.password,
    userData.password,
  );

  if (!validPassword) {
    throw new Error("Password is incorrect!");
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

const changePassword = async (
  payload: {
    oldPassword: string;
    newPassword: string;
  },
  user: string,
) => {
  const validUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: user,
      status: "ACTIVE",
    },
  });

  const verifyPass = await bcrypt.compare(
    payload.oldPassword,
    validUser.password,
  );
  if (!verifyPass) {
    throw new Error("Password is incorrect");
  }

  const hashedPass = await bcrypt.hash(payload.newPassword, 12);

  const result = await prisma.user.update({
    where: {
      email: validUser.email,
    },
    data: {
      password: hashedPass,
      needPasswordChange: false,
    },
  });
  return result;
};

const forgotPassword = async (payload: { email: string }) => {
  const validUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: "ACTIVE",
    },
  });
  const resetPassToken = jwtHelper.generateToken(
    { email: validUser.email, role: validUser.role },
    config.jwt.reset_pass_secret,
    config.jwt.reset_pass_expires_in as any,
  );

  const resetLink = `${config.jwt.reset_url_link}?userId=${validUser.id}&token=${resetPassToken}`;
  console.log(resetLink);
  senderEmail(validUser.email);
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
};

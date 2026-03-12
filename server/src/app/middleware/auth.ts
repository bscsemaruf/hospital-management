import { NextFunction, Request, Response } from "express";
import { jwtHelper } from "../../helper/jwtHelper";
import config from "../../config";
import AppError from "../../error/AppError";
import { StatusCodes } from "http-status-codes";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      const decoded = jwtHelper.verifyToken(
        token as string,
        config.jwt.access_secret,
      );
      console.log(decoded.email, decoded.role);
      if (roles.length && !roles.includes(decoded.role)) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "You are unauthorized");
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;

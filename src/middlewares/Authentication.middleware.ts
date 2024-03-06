import { NextFunction, Request, Response } from "express";
import { UserModeldb } from "../db/mysql/user.ts";
import jwt from "jsonwebtoken";
import { verifyTokenUser } from "../types/types";
export class AuthMiddleware {
  private readonly UserModelDb: UserModeldb;
  constructor(UserModelDb: UserModeldb) {
    this.UserModelDb = UserModelDb;
  }
  authentication = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (token === undefined) {
        return res.status(401).json({ message: "Unauthorized" });
      }
    const decoded = jwt.verify(
      token,
      process.env.JWT_KEY as string
    ) as verifyTokenUser;
    const user = await this.UserModelDb.getUserByPhone(decoded.phone);
    if (user !== undefined && user[0].length === 1) {
      req.headers.phone = user[0][0].phone;
      next();
    }
  };
}

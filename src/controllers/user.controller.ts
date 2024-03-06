import { Request, Response } from "express";
import { UserModeldb } from "../db/mysql/user.ts";
import type { userBasicInfo, verifyTokenUser } from "../types/types";
import jws from "jsonwebtoken";

export class UserController {
  private readonly UserModelDb: UserModeldb;

  constructor(UserModelDb: UserModeldb) {
    this.UserModelDb = UserModelDb;
  }

  /**
   *
   * @param req -  Request that contains the user's basic information
   * @param res - Response that contains the token or object with the error message
   * @returns - Create a new user and return a token or an error message
   */
  createUserThatReturnAJwt = async (
    req: Request<unknown, unknown, userBasicInfo>,
    res: Response
  ): Promise<unknown> => {
    try {
      const { name, phone, password } = req.body;
      const result = await this.UserModelDb.createUser(name, phone, password);
      if (result !== undefined && result[0].affectedRows === 1) {
        const token = jws.sign({ phone }, process.env.JWT_KEY as string);
        return res.status(201).json({ token: `Berer ${token}` });
      }
      return res.status(405).json({ msg: "error al crear el usuario" });
    } catch (error) {
      console.error("Error: ", error);
      return res
        .status(500)
        .json({ message: "Internal server error" }) as unknown as undefined;
    }
  };
  /**
   * 
   * @param req  - Request that contains the user's basic information
   * @param res  - Response that contains the token or an error message
   * @returns  Recover the user's data and return a token or an error message
   */
  recoverUserAndReturnAJwt = async (
    req: Request<unknown, unknown, userBasicInfo>,
    res: Response
  ) => {
    try {
      const { phone, password } = req.body;
      const result = await this.UserModelDb.getUserByPhone(phone);
      if (result !== undefined && result[0].length === 1) {
        if (result[0][0].password === password) {
          const token = jws.sign({ phone }, process.env.JWT_KEY as string);
          return res.status(200).json({ token: `Berer ${token}` });
        }
        return res.status(401).json({ message: "Unauthorized" });
      }
      return res.status(404).json({ message: "User not found" });
    } catch (error) {
      console.error("Error: ", error);
      return res
        .status(500)
        .json({ message: "Internal server error" }) as unknown as undefined;
    }
  }
  /**
   *
   * @param req - Request that contains the token
   * @param res - Response that contains the user's data or an error message
   * @returns - Recover the user's data from the token
   */
  recoverUserDataFromToken = async (
    req: Request<unknown, unknown, unknown, { token: string }>,
    res: Response
  ): Promise<unknown> => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (token === undefined) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const decoded = jws.verify(
        token,
        process.env.JWT_KEY as string
      ) as verifyTokenUser;
      const result = await this.UserModelDb.getUserByPhone(decoded.phone);
      if (result !== undefined && result[0].length === 1) {
        const user = {
          username: result[0][0].username,
          phone: result[0][0].phone,
        };
        return res.status(200).json({ user });
      }
      return res.status(404).json({ message: "User not found" });
    } catch (error) {
      console.error("Error: ", error);
      return res
        .status(500)
        .json({ message: "Internal server error" }) as unknown as undefined;
    }
  };
  /**
   *
   * @param req
   * @param res  - Response that contains all the users from the database
   * @returns  Recover all the users basic info from the database
   */
  recoverAllUsers = async (
    req: Request<
      unknown,
      unknown,
      unknown,
      { search:string | undefined }
    >,
    res: Response
  ): Promise<unknown> => {
    try {
      const { search } = req.query;
      let result = await this.UserModelDb.getAllUsers(search);
      if (result !== undefined && result[0].length > 0) {
        return res.status(200).json({
          users: result[0].map((user) => {
            return {
              username: user.username,
              phone: user.phone,
            };
          }),
        });
      }
      return res.status(404).json({ message: "Users not found" });
    } catch (error) {
      console.error("Error: ", error);
      return res
        .status(500)
        .json({ message: "Internal server error" }) as unknown as undefined;
    }
  };
}

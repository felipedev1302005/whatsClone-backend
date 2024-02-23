import { Request, Response } from 'express'
import { UserModel, UserModeldb } from '../db/mysql/user.ts'
import type { userBasicInfo } from '../types/types.d.ts'
import jws from 'jsonwebtoken'
export class UserController {
  // constructor (UserModelDb: UserModeldb) {
  // this.UserModelDb = UserModelDb
  // }

  /**
   *
   * @param req -  Request that contains the user's basic information
   * @param res - Response that contains the token or object with the error message
   * @returns - Create a new user and return a token or an error message
   */
  static async createUser (req: Request<unknown, unknown, userBasicInfo>, res: Response): Promise<unknown> {
    try {
      const { name, phone, password } = req.body
      const result = await UserModel.createUser(name, phone, password)
      if (result !== undefined && result[0].affectedRows === 1) {
        const token = jws.sign({ phone }, process.env.JWT_KEY as string)
        return res.status(201).json({ token: `Berer ${token}` })
      }
    } catch (error) {
      console.error('Error: ', error)
      return res.status(500).json({ message: 'Internal server error' }) as unknown as undefined
    }
  }

  hello (): string {
    return 'hello'
  }
}

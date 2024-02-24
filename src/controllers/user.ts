import { Request, Response } from 'express'
import { UserModeldb } from '../db/mysql/user.ts'
import type { userBasicInfo } from '../types/types.d.ts'
import jws from 'jsonwebtoken'

export class UserController {
  private readonly UserModelDb: UserModeldb

  constructor (UserModelDb: UserModeldb) {
    this.UserModelDb = UserModelDb
  }

  /**
   *
   * @param req -  Request that contains the user's basic information
   * @param res - Response that contains the token or object with the error message
   * @returns - Create a new user and return a token or an error message
   */
  createUserThatReturnAJwt = async (req: Request<unknown, unknown, userBasicInfo>, res: Response): Promise<unknown> => {
    try {
      const { name, phone, password } = req.body
      const result = await this.UserModelDb.createUser(name, phone, password)
      if (result !== undefined && result[0].affectedRows === 1) {
        const token = jws.sign({ phone }, process.env.JWT_KEY as string)
        return res.status(201).json({ token: `Berer ${token}` })
      }
    } catch (error) {
      console.error('Error: ', error)
      return res.status(500).json({ message: 'Internal server error' }) as unknown as undefined
    }
    return res.status(500).json({ message: 'Internal server error' }) as unknown as undefined
  }

  /**
   *
   * @param req - Request that contains the token
   * @param res - Response that contains the user's data or an error message
   * @returns - Recover the user's data from the token
   */
  recoverUserDataFromToken = async (req: Request<unknown, unknown, unknown, { token: string }>, res: Response): Promise<unknown> => {
    try {
      const token = req.headers.authorization?.split(' ')[1]
      if (token === undefined) {
        return res.status(401).json({ message: 'Unauthorized' })
      }
      const decoded = jws.verify(token, process.env.JWT_KEY as string)
      const result = await this.UserModelDb.getUserByPhone(decoded.phone as number)
      console.log(result)
      if (result !== undefined && result[0].length === 1) {
        return res.status(200).json({ user: result[0][0] })
      }
      return res.status(404).json({ message: 'User not found' })
    } catch (error) {
      console.error('Error: ', error)
      return res.status(500).json({ message: 'Internal server error' }) as unknown as undefined
    }
  }
}

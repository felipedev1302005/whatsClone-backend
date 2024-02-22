import { Request, Response } from 'express'
import { UserModel } from '../db/mysql/user.ts'
import type { userBasicInfo } from '../types/types.d.ts'

export class UserController {
  static async createUser (req: Request<unknown, unknown, userBasicInfo>, res: Response): Promise<void> {
    try {
      const { name, phone, password } = req.body
      const result = await UserModel.createUser(name, phone, password)
      return res.status(201).json(result) as unknown as undefined
    } catch (error) {
      console.error('Error: ', error)
      return res.status(500).json({ message: 'Internal server error' }) as unknown as undefined
    }
  }

  hello (): string {
    return 'hello'
  }
}

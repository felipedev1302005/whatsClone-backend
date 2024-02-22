import { createConnection } from './createConectiondb.ts'

export const pool = await createConnection()

export class UserModel {
  static async createUser (username: string, phone: number, password: string): Promise<undefined> {
    try {
      const result = await pool?.query('INSERT INTO user (username, phone, pasword) VALUES (?, ?, ?)', [username, phone, password])
      console.log(result)
    } catch (error) {
      console.error('Error: ', error)
    }
    return undefined
  }

  hello (): string {
    return 'hello'
  }
}
export type UserModeldb = typeof UserModel

import { ResultSetHeader, FieldPacket } from 'mysql2'
import { createConnection } from './createConectiondb.ts'
export const pool = await createConnection()

type ResultCreateUser = [ResultSetHeader, FieldPacket[]] | undefined
/**
 * @class UserModel - A class that contains all the methods that are related to the user model
 */
export class UserModel {
  /**
   *
   * @param username - A string that represents the username of the user
   * @param phone - A number that represents the phone number of the user
   * @param password - A string that represents the password of the user
   * @returns A promise that contains the result of the query
   */
  static async createUser (username: string, phone: number, password: string): Promise<ResultCreateUser> {
    try {
      const result = await pool?.query<ResultSetHeader>('INSERT INTO user (username, phone, pasword) VALUES (?, ?, ?)', [username, phone, password])
      return result
    } catch (error) {
      console.error('Error: ', error)
      return undefined
    }
  }

  static async getUserById (id: number): Promise<void> {
    try {
      const result = await pool?.query('SELECT * FROM user WHERE id = ?', [id])
      console.log(result)
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  hello (): string {
    return 'hello'
  }
}
export type UserModeldb = typeof UserModel

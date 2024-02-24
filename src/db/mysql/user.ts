import { ResultSetHeader, FieldPacket, RowDataPacket } from 'mysql2'
import { createConnection } from './createConectiondb.ts'
export const pool = await createConnection()

type ResultCreateUser = [ResultSetHeader, FieldPacket[]] | undefined
type ResultGetUserByPhone = [RowDataPacket[], FieldPacket[]] | undefined
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

  static async getUserByPhone (phone: number): Promise<ResultGetUserByPhone> {
    try {
      const result = await pool?.query<RowDataPacket[]>('SELECT * FROM user WHERE phone = ?', [phone])
      console.log(result)
      return result
    } catch (error) {
      return undefined
    }
  }

  hello (): string {
    return 'hello'
  }
}
export type UserModeldb = typeof UserModel

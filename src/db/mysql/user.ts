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
      const result = await pool?.query<ResultSetHeader>('INSERT INTO user (username, phone, password) VALUES (?, ?, ?)', [username, phone, password])
      return result
    } catch (error) {
      throw new Error("Error: Can't create the user");
    }
  }

  static async getUserByPhone (phone: number): Promise<ResultGetUserByPhone> {
    try {
      const result = await pool?.query<RowDataPacket[]>('SELECT * FROM user WHERE phone = ?', [phone])
      return result
    } catch (error) {
      throw new Error("Error: Can't get the user");
    }
  }
  /**
   * 
   * @returns A promise that contains the result of the query
   */
  static async getAllUsers (searchName:string | undefined, searchPhone:string | undefined): Promise<ResultGetUserByPhone> {
    try {
      if(searchName && searchPhone){
        const result = await pool?.query<RowDataPacket[]>('SELECT * FROM user WHERE username LIKE ? AND phone LIKE ?', [`%${searchName}%`, `%${searchPhone}%`])
        return result
      }
      if(searchName){
        const result = await pool?.query<RowDataPacket[]>('SELECT * FROM user WHERE username LIKE ?', [`%${searchName}%`])
        return result
      }
      if(searchPhone){
        const result = await pool?.query<RowDataPacket[]>('SELECT * FROM user WHERE phone LIKE ?', [`%${searchPhone}%`])
        return result
      }
      const result = await pool?.query<RowDataPacket[]>('SELECT * FROM user')
      return result
    } catch (error) {
      throw new Error("Error: Can't get the users");
    }
  }

  hello (): string {
    return 'hello'
  }
}
export type UserModeldb = typeof UserModel

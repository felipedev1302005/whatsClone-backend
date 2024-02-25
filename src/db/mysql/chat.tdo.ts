import { ResultSetHeader,FieldPacket,RowDataPacket } from "mysql2"
import { createConnection } from "./createConectiondb.ts"
export const pool = await createConnection()

type ResultCreateChat = [ResultSetHeader, FieldPacket[]] | undefined
type ResultGetChatByUserPhone = [RowDataPacket[], FieldPacket[]] | undefined
export class ChatModel {
  static async createChat (user_1:number, user_2:number): Promise<ResultCreateChat> {
    try {
    //   const UUID = await pool?.query<RowDataPacket[]>('SELECT UUID() as id')
    //   const id = UUID?.[0][0].id as string
      const result = await pool?.query<ResultSetHeader>('INSERT INTO chat (id, user_1, user_2) VALUES (UUID(), ?, ?)', [ user_1, user_2])
      console.log(result)
      return result
    } catch (error) {
      console.error('Error: ', error)
      return undefined
    }
  }
  static async getChatByUserPhone (user_phone:number): Promise<ResultGetChatByUserPhone> {
    try {
      const result = await pool?.query<RowDataPacket[]>('SELECT * FROM chat WHERE user_1 = ? OR user_2 = ?', [user_phone, user_phone])
      return result
    } catch (error) {
      console.error('Error: ', error)
      return undefined
    }
  }
}
export type ChatModeldb = typeof ChatModel
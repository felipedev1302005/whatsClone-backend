import { ResultSetHeader, RowDataPacket } from "mysql2";
import { messageBasicInfo } from "../../types/types";
import { createConnection } from "./createConectiondb.ts";
export const pool = await createConnection();
export class MessageModel {
  static async createMessage({
    chat_id,
    date,
    message_content,
    of_user,
  }: messageBasicInfo) {
    try {
      const result = await pool?.query<ResultSetHeader>(
        "INSERT INTO message (id, chat_id, of_user, message_content, data) VALUES (UUID(), ?, ?, ?, >)",
        [chat_id, of_user, message_content, date]
      );
      return result;
    } catch (error) {
      return undefined;
    }
  }
  static async getMessageByChatId({ chat_id }: { chat_id: string }) {
    try {
        const result = await pool?.query<RowDataPacket[]>('SELECT * FROM message WHERE chat_id = ?', [chat_id])
        return result
      } catch (error) {
        console.error('Error: ', error)
        return undefined
      }
  }
}
export type messageModeldb = typeof MessageModel
import { Request, Response } from "express";
import { messageModeldb } from "../db/mysql/message.dto.ts";
import { messageBasicInfo } from "../types/types";

export class MessageController {
  private readonly chatModelDto: messageModeldb;
  constructor(chatModelDto: messageModeldb) {
    this.chatModelDto = chatModelDto;
  }
  createMessage = async ({ body }: Request<unknown, unknown, messageBasicInfo>, res: Response) => {
    const { chat_id, date, message_content, of_user } = body;
    try {
        const result = await this.chatModelDto.createMessage({chat_id,date,message_content,of_user})
        if (result !== undefined && result[0].affectedRows === 1) {
            res.status(201).json({msg:'Message created'})
        } else {
            res.status(405).json({msg:'Message not created'})
        }
    } catch (error) {
        console.error('Error: ', error)
        res.status(500).json({ message: 'Internal server error' })
    }
  };
  getMessagesByChatId = async (req: Request<unknown, unknown, unknown, unknown >,res: Response) => {
    const chat_id = req.params?.chat_id as string
    try {
        const result = await this.chatModelDto.getMessageByChatId({chat_id});
      if (result !== undefined && result[0].length > 0) {
        res.status(200).json({ chats: result[0] });
      } else {
        res.status(404).json({ message: "Messages not found" });
      }
    } catch (error) {
      console.error("Error: ", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

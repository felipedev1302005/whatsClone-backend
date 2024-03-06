import { Request, Response } from "express";
import { MessageModeldb } from "../db/mysql/message.dto.ts";
import { messageBasicInfo } from "../types/types";
interface paramsOfGetMessagesByChatId {
  chat_id: string
}

export class MessageController {
  private readonly chatModelDto: MessageModeldb;
  constructor(chatModelDto: MessageModeldb) {
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
  getMessagesByChatId = async ({params}: Request<paramsOfGetMessagesByChatId, unknown, unknown, unknown >,res: Response) => {
        try {
        const result = await this.chatModelDto.getMessageByChatId({chat_id:params.chat_id});
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

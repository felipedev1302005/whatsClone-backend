import { Request, Response } from "express";
import { chatBasicInfo } from "../types/types";
import { ChatModeldb } from "../db/mysql/chat.tdo";

export class chatController {
  private readonly chatModelDto: ChatModeldb;
  constructor(chatModelDto: ChatModeldb) {
    this.chatModelDto = chatModelDto;
  }
  createChat = async ({ body }: Request<unknown, unknown, chatBasicInfo>,res: Response): Promise<void> => {
    const { user_1, user_2 } = body;
    try {
      const result = await this.chatModelDto.createChat(user_1,user_2)
        if (result !== undefined && result[0].affectedRows === 1) {
            res.status(201).json({msg:'Chat created'})
        } else {
            res.status(405).json({msg:'Chat not created'})
        }
      
    } catch (error) {
        console.error('Error: ', error)
        res.status(500).json({ message: 'Internal server error' })
    }
  };
  getChatByUserPhone = async (req: Request<unknown, unknown, unknown, { user_phone: string } >,res: Response): Promise<void> => {
    const user_phone = Number(req.params?.user_phone);
    try {
      const result = await this.chatModelDto.getChatByUserPhone(user_phone);
      if (result !== undefined && result[0].length > 0) {
        res.status(200).json({ chats: result[0] });
      } else {
        res.status(404).json({ message: "Chats not found" });
      }
    } catch (error) {
      console.error("Error: ", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

import { Router } from "express";
import { messageModeldb } from "../db/mysql/message.dto.ts";
import { MessageController as msgController} from "../controllers/message.controller.ts";
export function MessageRouter({ messageModeldb }: { messageModeldb: messageModeldb }) {
    const MessageRouter = Router()
    const MessageController = new msgController(messageModeldb)
    MessageRouter.post('/',MessageController.createMessage)
    MessageRouter.get('/:chat_id',MessageController.getMessagesByChatId)
}

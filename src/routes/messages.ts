import { Router } from "express";
import { MessageModeldb } from "../db/mysql/message.dto.ts";
import { MessageController as msgController} from "../controllers/message.controller.ts";
export function MessageRouter({ messageModelDb }: { messageModelDb: MessageModeldb }) {
    const MessageRouter = Router()
    const MessageController = new msgController(messageModelDb)
    MessageRouter.post('/',MessageController.createMessage)
    MessageRouter.get('/:chat_id',MessageController.getMessagesByChatId)
    return MessageRouter
}

import { Router } from "express";
import { ChatModeldb } from "../db/mysql/chat.tdo.ts";
import { chatController } from "../controllers/chat.controller.ts";

export function ChatRouter({chatModelDb}:{chatModelDb:ChatModeldb}) {
    const ChatRouter = Router()
    const ChatController = new chatController(chatModelDb)

    ChatRouter.post('/',ChatController.createChat)
    ChatRouter.get('/:user_phone',ChatController.getChatByUserPhone)
    return ChatRouter
}
import { Router } from "express";
import { ChatModeldb } from "../db/mysql/chat.tdo.ts";
import { chatController } from "../controllers/chat.controller.ts";
import { AuthMiddleware as AuthMidd } from '../middlewares/Authentication.middleware.ts'
import { UserModel, UserModeldb } from "../db/mysql/user.ts";
export function ChatRouter({chatModelDb,userModelDb}:{chatModelDb:ChatModeldb,userModelDb:UserModeldb}) {
    const ChatRouter = Router()
    const ChatController = new chatController(chatModelDb)
    const AuthMiddleware = new AuthMidd(userModelDb) // Pass the required argument here
    ChatRouter.post('/',ChatController.createChat)
    ChatRouter.get('/byPhone',AuthMiddleware.authentication ,ChatController.getChatByUserPhone)
    return ChatRouter
}
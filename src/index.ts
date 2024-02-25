import { config } from 'dotenv'
import { initizelApp } from './app.ts'
import { UserModel } from './db/mysql/user.ts'
import { ChatModel } from './db/mysql/chat.tdo.ts'
config()
initizelApp({ Db: { userModelDb: UserModel, chatModelDb:ChatModel } })

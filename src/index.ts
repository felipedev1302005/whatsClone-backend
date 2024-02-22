import { config } from 'dotenv'
import { initizelApp } from './app.ts'
import { UserModel } from './db/mysql/user.ts'
config()
initizelApp({ Db: { userModelDb: UserModel } })

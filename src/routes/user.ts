import { Router } from 'express'
import { UserController as UserCont } from '../controllers/user.controller.ts'
import { UserModeldb } from '../db/mysql/user.ts'
export function CreateUserRouter ({ userModelDb }: { userModelDb: UserModeldb }): Router {
  const userRouter = Router()
  const UserController = new UserCont(userModelDb)
  userRouter.get('/', UserController.recoverAllUsers)
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return userRouter
}

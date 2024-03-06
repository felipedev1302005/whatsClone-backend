import { Router } from 'express'
import { UserController as UserCont } from '../controllers/user.controller.ts'
import { UserModeldb } from '../db/mysql/user.ts'
export function SingRouter ({ userModelDb }: { userModelDb: UserModeldb }): Router {
  const userRouter = Router()
  const UserController = new UserCont(userModelDb)

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  userRouter.post('/singUp', UserController.createUserThatReturnAJwt)
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  userRouter.post('/singIn', UserController.recoverUserDataFromToken)
  return userRouter
}

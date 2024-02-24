import { Router } from 'express'
import { UserController as UserCont } from '../controllers/user.ts'
import { UserModeldb } from '../db/mysql/user.ts'
export function SingRouter ({ userModelDb }: { userModelDb: UserModeldb }): Router {
  const userRouter = Router()
  const UserController = new UserCont(userModelDb)

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  userRouter.post('/singIn', UserController.createUserThatReturnAJwt)
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  userRouter.post('/singUp', UserController.recoverUserDataFromToken)
  return userRouter
}

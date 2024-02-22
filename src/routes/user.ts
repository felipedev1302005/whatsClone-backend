import { Router } from 'express'
import { UserController } from '../controllers/user.ts'
const userRouter = Router()
userRouter.get('/', (_req, res) => {
  res.send('Hello World')
})
// eslint-disable-next-line @typescript-eslint/no-misused-promises
userRouter.post('/', UserController.createUser)
export default userRouter

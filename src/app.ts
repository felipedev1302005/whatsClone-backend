import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import userRouter from './routes/user.ts'
import { UserModeldb } from './db/mysql/user.ts'
interface InitizelAppDb {
  userModelDb: UserModeldb

}
interface InitizelApp {
  Db: InitizelAppDb
}
export function initizelApp ({ Db }: InitizelApp): void {
  const { userModelDb } = Db
  console.log(userModelDb)
  const app = express()
  app.use(express.json())
  app.use('/user', userRouter)

  //  socket.io
  const server = createServer(app)
  const io = new Server(server, { /* options */ })
  io.on('connection', (_socket) => {
    // ...
    console.log('hello word')
  })

  server.listen(process.env.PORT ?? 3000, () => {
    console.log('listening on *:3000')
  })
}

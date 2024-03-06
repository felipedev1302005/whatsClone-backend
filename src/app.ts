import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import cors from 'cors'
import { SingRouter } from './routes/sing.ts'
import { ChatRouter } from './routes/chat.ts'
import { MessageRouter } from './routes/messages.ts'
import { CreateUserRouter } from './routes/user.ts'
import { UserModeldb } from './db/mysql/user.ts'
import { ChatModeldb } from './db/mysql/chat.tdo.ts'
import { MessageModeldb } from './db/mysql/message.dto.ts'
interface InitizelAppDb {
  userModelDb: UserModeldb
  chatModelDb: ChatModeldb
  messageModelDb: MessageModeldb

}
interface InitizelApp {
  Db: InitizelAppDb
}
export function initizelApp ({ Db }: InitizelApp): void {
  const { userModelDb,chatModelDb,messageModelDb } = Db
  const app = express()
  app.use(express.json())
  app.use(cors())
  //  routes
  app.use('/', SingRouter({ userModelDb }))
  app.use('/chat',ChatRouter({chatModelDb}))
  app.use('/message',MessageRouter({messageModelDb}))
  app.use('/user',CreateUserRouter({userModelDb}))
  //  socket.io
  const server = createServer(app)
  const io = new Server(server, { 
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
   })
  io.on('connection', (socket) => {
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
       
  })

  server.listen(process.env.PORT ?? 3000, () => {
    console.log('listening on *:3000')
  })
}

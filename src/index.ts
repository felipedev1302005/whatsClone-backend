import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { config } from 'dotenv'
config()
const app = express()
app.get('/', (_req, res) => {
  res.send('Hello World')
})
const server = createServer(app)
const io = new Server(server, { /* options */ })
io.on('connection', (_socket) => {
  // ...
  console.log('hello word')
})

server.listen(3000)

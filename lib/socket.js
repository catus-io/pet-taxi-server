import app from '../config/app.config'
import http from 'http'
import { server as WebSocketServer } from 'websocket';
const server = http.createServer(app);
const clients = []

const wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
})

wsServer.on('request', function(request) {
  console.log('WebSocket connected')
  const connection = request.accept(null, request.origin);

  wsServer.on('message', message => {
    console.log(message)
    connection.send('Gracias!')
  })

  // todo list
  // 1. to remove when the client closed socket
  // 2. to broadcast not requested client
  clients.push(connection)
})


export default {
  server: server,
  clients: clients
}
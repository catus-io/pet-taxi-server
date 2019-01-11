import app from './config/app.config'
import socket from './lib/socket'
import router from './router'

app.use('/api', router)

socket.server.listen(3000, () => console.log(`This server has been started with port ${app.get('port')}`))
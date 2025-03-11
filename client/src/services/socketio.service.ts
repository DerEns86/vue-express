import { io } from 'socket.io-client'

class SocketioService {
  socket: any
  constructor() {}

  setupSocketConnection() {
    this.socket = io(import.meta.env.VITE_SOCKET_ENDPOINT)
    this.socket.emit('my message', 'from socket')

    this.socket.on('my broadcast', (data: any) => {
      console.log(data)
    })
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
    }
  }
}

export default new SocketioService()

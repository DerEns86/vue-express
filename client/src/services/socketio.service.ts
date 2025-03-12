import { io } from 'socket.io-client'

const SERVER_URL =
  window.location.hostname === 'localhost'
    ? import.meta.env.VITE_SOCKET_ENDPOINT_LOCAL
    : import.meta.env.VITE_SOCKET_ENDPOINT_NETWORK

class SocketioService {
  socket: any
  constructor() {}

  setupSocketConnection(username: string) {
    this.socket = io(SERVER_URL)

    this.socket.emit('set username', username)

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

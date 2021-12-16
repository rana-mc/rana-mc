import { Server as SocketIOServer } from 'socket.io'
import { Server as HTTPServer } from 'http'

export default class RanaSocket {

  socket: SocketIOServer

  constructor(server: HTTPServer) {
    this.socket = new SocketIOServer(server);
    this.init();
  }

  init() {
    this.socket.on('connection', client => {
      client.on('event', data => { /* … */ });
      client.on('disconnect', () => { /* … */ });
    });
  }
}
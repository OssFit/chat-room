import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessageService } from './message.service';
import { IoAdapter } from '@nestjs/platform-socket.io';

@WebSocketGateway({ namespace: '/chat' })
export class WebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private messageService: MessageService) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(socket: any) {
    // add new client to the clients array
    this.messageService.addClient(socket);

    // send list of previous messages to the client
    const messages = await this.messageService.getPreviousMessages();
    socket.emit('previousMessages', messages);
  }

  handleDisconnect(socket: any) {
    // remove client from the clients array
    this.messageService.removeClient(socket);
  }

  handleInit() {
    console.log('WebSocket gateway initialized');
  }

  afterInit(server: any) {
    console.log('WebSocket gateway after initialized');
    server.adapter = new IoAdapter(server);
  }
}

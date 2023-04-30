import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from './message.service';

@WebSocketGateway({ cors: true })
export class WebsocketGateway {
  constructor(private messageService: MessageService) {}

  @WebSocketServer()
  server: Server;

  handleDisconnect(socket: any) {
    this.messageService.removeClient(socket);
  }

  @SubscribeMessage('registerClient')
  registerClient(client: Socket, data: any){
    this.messageService.addClient(client, data);
  }
}

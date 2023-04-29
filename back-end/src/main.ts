import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server } from 'socket.io';
import { WebsocketGateway } from './websocket.gateway';
import { MessageService } from './message.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useWebSocketAdapter(new IoAdapter(app));

  // Access the underlying socket.io server instance
  const httpServer = app.getHttpServer();
  const io = new Server(httpServer.httpServer);

  // Inject the WebsocketGateway
  const webSocketGateway = app.get(WebsocketGateway);

  // Call the handleConnection method from the WebSocketGateway class
  io.on('connection', (socket) => {
    console.log(`Client ${socket.id} connected`);
    webSocketGateway.handleConnection(socket);
  });

  await app.listen(3000);
}

bootstrap();

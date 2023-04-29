import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server } from 'socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new IoAdapter(app));

  // Access the underlying socket.io server instance
  const httpServer = app.getHttpServer();
  const io = new Server(httpServer.httpServer);

  // Add any socket.io event handlers here, for example:
  io.on('connection', (socket) => {
    console.log(`Client ${socket.id} connected`);
  });

  await app.listen(3000);
}
bootstrap();

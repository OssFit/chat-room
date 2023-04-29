import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { Message } from './message.entity';
import { JwtModule } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { WebsocketGateway } from './websocket.gateway';
import { io } from 'socket.io-client';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5442,
      username: 'username',
      password: 'password',
      database: 'mydb',
      entities: [User, Message],
      synchronize: true,
    }),
    JwtModule.register({
      secret: "mysupersecret",
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([User, Message]),
  ],
  controllers: [AuthController, UserController, MessageController],
  providers: [AuthService, UserService, MessageService, WebsocketGateway, {
    provide: 'WS_SERVER',
    useValue: io('http://localhost:3000')
  }, {
    provide: 'IoAdapter',
    useClass: IoAdapter,
  }],
})
export class AppModule {}

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

@Module({
imports: [
TypeOrmModule.forRoot({
// Database connection configuration
type: 'postgres',
host: process.env.DATABASE_HOST || 'localhost',
port: parseInt(process.env.DATABASE_PORT, 10) || 5442,
username: process.env.DATABASE_USERNAME || 'username',
password: process.env.DATABASE_PASSWORD || 'password',
database: process.env.DATABASE_NAME || 'mydb',
entities: [User, Message],
synchronize: true,
}),
JwtModule.register({
secret: process.env.JWT_SECRET,
signOptions: { expiresIn: '1h' },
}),
TypeOrmModule.forFeature([User, Message]) // add Message to the imports array
],
controllers: [AuthController, UserController, MessageController],
providers: [AuthService, UserService, MessageService],
})
export class AppModule {}
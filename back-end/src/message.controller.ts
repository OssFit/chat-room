// message.controller.ts

import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { Message } from './message.entity';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async sendMessage(@Body() message: Message): Promise<Message> {
    return this.messageService.sendMessage(message);
  }

  @Get()
  async listMessages(
    @Query('senderId') senderId: number,
    @Query('receiverId') receiverId: number,
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
  ): Promise<Message[]> {
    return this.messageService.listMessages(senderId, receiverId, page, pageSize);
  }
}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; // Import ILike from typeorm
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async sendMessage(message: Message): Promise<Message> {
    message.createdAt = new Date(); // set createdAt to the current date
    return this.messageRepository.save(message);
  }
  
  async listMessages(
    senderId: number,
    receiverId: number,
    page: number,
    pageSize: number,
  ): Promise<Message[]> {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    return this.messageRepository.find({
      where: [{ senderId, receiverId }, { senderId: receiverId, receiverId: senderId }],
      order: { createdAt: 'ASC' },
      skip,
      take,
    });
  }

  
}

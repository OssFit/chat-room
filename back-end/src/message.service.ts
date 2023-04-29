import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  // create an array to store connected clients
  private clients: any[] = [];

  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async sendMessage(message: Message): Promise<Message> {
    message.createdAt = new Date(); // set createdAt to the current date
    const savedMessage = await this.messageRepository.save(message);
    this.broadcastMessage(savedMessage);
    return savedMessage;
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

  // add a new client to the clients array
  addClient(client: any) {
    this.clients.push(client);
  }

  // remove a client from the clients array
  removeClient(client: any) {
    const index = this.clients.indexOf(client);
    if (index !== -1) {
      this.clients.splice(index, 1);
    }
  }

  // broadcast a new message to all connected clients
  broadcastMessage(message: Message) {
    console.log("message", Message)
    this.clients.forEach(client => {
      client.emit('newMessage', message);
    });
  }

  // get previous messages from the message repository
  async getPreviousMessages(): Promise<Message[]> {
    return this.messageRepository.find();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  // create an array to store connected clients
  private clients = {};
  private sockets = {};

  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async sendMessage(message: Message): Promise<Message> {
    message.createdAt = new Date(); // set createdAt to the current date
    const savedMessage = await this.messageRepository.save(message);
    this.sendLiveMessage(savedMessage);
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
  addClient(client: any, data: any) {
    this.sockets[client] = [data.senderId, data.receiverId];
    const newClient = data.receiverId in this.clients ? this.clients[data.receiverId] : {}
    newClient[data.senderId] = client;
    this.clients[data.receiverId] = newClient;
  }

  // remove a client from the clients array
  removeClient(socket: any) {
    console.log(this.sockets[socket]);
    const [senderId, receiverId] = this.sockets[socket];
    delete this.sockets[socket];
    delete this.clients[receiverId][senderId];
  }

  sendLiveMessage(message: Message){
    const socket = this.clients[message.senderId][message.receiverId];
    socket.emit("newLiveMessage", message);
  }
}

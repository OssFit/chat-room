import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signUp(user: User): Promise<User> {
    // TODO: validate user data and hash password
    return this.userRepository.save(user);
  }

  async signIn(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    // TODO: check password and return user if valid
    return user;
  }

  async searchUsersByName(match: string) : Promise<User[]> {
    let resp =  await this.userRepository.find({
      where: [
        { firstName: ILike(`%${match}%`) },
        { lastName: ILike(`%${match}%`) },
        { email: ILike(`%${match}%`) },
        { phoneNumber: ILike(`%${match}%`) }
      ]
    });
    return resp;
  }
  

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }
  
}

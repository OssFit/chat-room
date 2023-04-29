import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, Not } from 'typeorm';
import { User } from './user.entity';
import { UnauthorizedException } from './unauthorized.exception';

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
    if (user && user.password === password) {
      return user;
    }
    throw new UnauthorizedException('Invalid email or password');
  }

  async searchUsersByName(match: string, id?: string): Promise<User[]> {
    const userId = parseInt(id, 10);
    let where: any[] = [
      { firstName: ILike(`%${match}%`) },
      { lastName: ILike(`%${match}%`) },
      { email: ILike(`%${match}%`) },
      { phoneNumber: ILike(`%${match}%`) }
    ];
  
    if (id) {
      where.push({ id: Not(id) });
    }
  
    const resp = await this.userRepository.find({
      where,
    });
  
    return resp;
  }
  
  
  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async getUserById(id: string): Promise<User> {
    const userId = parseInt(id, 10);
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return user;
  }

  
  
}

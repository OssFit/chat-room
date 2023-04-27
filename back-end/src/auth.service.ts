/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(user: User): string {
    const payload = { email: user.email, id: user.id }; // Define the payload for the JWT token
    return this.jwtService.sign(payload); // Sign the payload with the secret key defined in the JWT module configuration
  }
}

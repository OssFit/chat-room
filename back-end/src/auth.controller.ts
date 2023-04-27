import { Controller, Post, Body } from '@nestjs/common';
import { User } from './user.entity';
import { MessageService } from './message.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService, // Inject the AuthService here
  ) {}

  @Post('signup')
  async signUp(@Body() user: User): Promise<User> {
    return this.userService.signUp(user);
  }

  @Post('signin')
  async signIn(@Body() { email, password }): Promise<{ token: string }> {
    const user = await this.userService.signIn(email, password);

    // Generate a JWT token using the AuthService
    const token = this.authService.generateToken(user);

    return { token };
  }
}

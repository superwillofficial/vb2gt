import { Body, Controller, Post } from '@nestjs/common';
import { CreateuserDto } from '../user/dto/index.dto';
import { UserEntity } from '../user/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sendCode')
  async sendVerificationCode(@Body() body: Partial<UserEntity>) {
    return await this.authService.sendVerificationCode(body);
  }

  @Post('validateCode')
  async validateCode(
    @Body() body: { phone: string; verificationCode: number },
  ) {
    return await this.authService.validateVerificationCode(body);
  }

  @Post('signup')
  async signUp(@Body() body: CreateuserDto) {
    return await this.authService.signup(body);
  }
}

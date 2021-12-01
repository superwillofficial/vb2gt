import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';

const waitForSignUp = [];

const random4Numbers = (): Number => {
  const number = Math.floor(Math.random() * 10000);
  console.log('number===', number);
  return number;
};

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async findUserByPhoneNumber(
    body: Partial<UserEntity>,
  ): Promise<UserEntity> | undefined {
    const user = await this.userRepository.findOne({ phone: body.phone });
    return user;
  }

  certificate(user: Partial<UserEntity>) {
    console.log('JWT验证 - Step 3: 处理 jwt 签证');
    const payload = {
      username: user.username,
      phone: user.phone,
      position: user.position,
    };
    try {
      const token = this.jwtService.sign(payload);
      return { token, signup: false, success: true };
    } catch (err) {
      throw new HttpException(err, 401);
    }
  }

  async sendVerificationCode(body: Partial<UserEntity>) {
    const currentUser = await this.findUserByPhoneNumber(body);
    // if (currentUser) {
    //   const result = this.certificate(currentUser);
    //   return result;
    // }
    waitForSignUp.push({
      phone: body.phone,
      verificationCode: random4Numbers(),
      signUp: currentUser ? false : true,
    });
    return '验证码发送成功！';
  }

  async validateVerificationCode(body: {
    phone: string;
    verificationCode: number;
  }) {
    const data = waitForSignUp.find(
      (el) =>
        el.phone == body.phone && el.verificationCode == body.verificationCode,
    );

    if (!data) {
      return { success: false, signUp: true };
    } else if (data.signUp) {
      const index = waitForSignUp.findIndex(
        (el) =>
          el.phone == body.phone &&
          el.verificationCode == body.verificationCode,
      );
      // 将手机号从缓存移除
      waitForSignUp.splice(index, 1);
      return { success: true, signUp: true };
    } else {
      const index = waitForSignUp.findIndex(
        (el) =>
          el.phone == body.phone &&
          el.verificationCode == body.verificationCode,
      );
      // 将手机号从缓存移除
      waitForSignUp.splice(index, 1);
      const currentUser = await this.findUserByPhoneNumber(body);
      return this.certificate(currentUser);
    }
  }

  async signup(body: Partial<UserEntity>) {
    const userExisted = await this.userRepository.findOne({ phone: body.phone });
    if (userExisted) {
      throw new HttpException('用户已存在!', 403);
    }
    await this.userRepository.save(body);

    return this.certificate(body);
  }
}

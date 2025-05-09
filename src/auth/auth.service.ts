import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { baseResponse } from 'src/common/response/base-response';
import { throwIfNotFound } from 'src/common/exception/throw-helper';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneWithUserName(username.trim());
    if (user && (await bcrypt.compare(password.trim(), user.password))) {
      const { password, ...result } = user;
      return baseResponse(result);
    }
    throwIfNotFound(user, `User with id ${username} not found`);
  }

  async login(user: User) {
    const payload = {
      username: user.email,
      sub: {
        name: user.name,
      },
    };

    return baseResponse({
      ...user,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    });
  }

  async refreshToken(user: User) {
    const payload = {
      username: user.email,
      sub: {
        name: user.name,
      },
    };

    return baseResponse({
      accessToken: this.jwtService.sign(payload),
    });
  }
}

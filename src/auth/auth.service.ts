import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthJwtPayload } from 'src/auth/types/auth-jwtPayload';
import { baseResponse } from 'src/common/response/base-response';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    // @Inject(refreshJwtConfig.KEY)
    // private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found!');
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      throw new UnauthorizedException('Invalid credentials');

    return { id: user.id };
  }

  async login(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    return baseResponse({
      id: userId,
      token: this.jwtService.sign(payload),
    },
    'Đăng nhập thành công!'
  );
  }

  // async generateTokens(userId: number) {
  //   const payload: AuthJwtPayload = { sub: userId };
  //   const [accessToken, refreshToken] = await Promise.all([
  //     this.jwtService.signAsync(payload),
  //     this.jwtService.signAsync(payload, this.refreshTokenConfig),
  //   ]);
  //   return {
  //     accessToken,
  //     refreshToken,
  //   };
  // }

  // async refreshToken(user: User) {
  //   const payload = {
  //     username: user.email,
  //     sub: {
  //       name: user.firstName,
  //     },
  //   };

  //   return baseResponse({
  //     accessToken: this.jwtService.sign(payload),
  //   });
  // }
}

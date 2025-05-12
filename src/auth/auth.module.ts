import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalStrategy } from 'src/auth/strategies/local-strategy';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from 'src/auth/strategies/jwt-strategy';
import { RefreshJwtStrategy } from 'src/auth/strategies/refreshToken.strategy';
import jwtConfig from 'src/auth/configs/jwt.config';
import { User } from 'src/user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import refreshJwtConfig from 'src/auth/configs/refresh-jwt.config';

@Module({
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
    UserService,
  ],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig)
  ],
})
export class AuthModule {}

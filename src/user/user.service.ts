import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { baseResponse } from 'src/common/response/base-response';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private UserRepo: Repository<User>) {}

  async create(createUserDto: CreateUserDTO) {
    const user = await this.UserRepo.create(createUserDto);
    return baseResponse(
      this.UserRepo.save(user),
      'Tạo khách hàng thành công!!!',
    );
  }

  async findByEmail(email: string) {
    return this.UserRepo.findOne({
      where: {
        email,
      },
    });
  }

  async updateHashedRefreshToken(userId: number, hashedRefreshToken: string) {
    return await this.UserRepo.update({ id: userId }, { hashedRefreshToken });
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    const user = await this.UserRepo.findOne({
      where: { id },
      select: ['firstName', 'lastName', 'avatarUrl'],
    });
    return baseResponse(user);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

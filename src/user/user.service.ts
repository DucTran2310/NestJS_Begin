import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throwIfNotFound } from 'src/common/exception/throw-helper';
import { baseResponse } from 'src/common/response/base-response';
import { User } from 'src/entities/user.entity';
import { CreateUserDTO, UpdateUserDTO } from 'src/user/dto/createUserDto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ){}

  async findAll() {
    const users = await this.userRepo.find();
    return baseResponse(users.map(({ password, ...rest }) => rest));
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    return baseResponse(user);
  }

  async findOneWithUserName(userName: string) {
    return await this.userRepo.findOne({ where: { email: userName } });
  }

  async create(createUserDto: CreateUserDTO) {
    const user = await this.userRepo.create(createUserDto);
    await this.userRepo.save(user);
    const { password, ...result } = user;
    return baseResponse(result);
  }

  async update(id: number, updateUserDto: UpdateUserDTO) {
    await this.userRepo.update(id, updateUserDto);
  
    const updatedUser = await this.userRepo.findOne({ where: { id } });
    throwIfNotFound(updatedUser, `User with id ${id} not found`);
  
    const { password, ...rest } = updatedUser!;
    return baseResponse(rest);
  }
}

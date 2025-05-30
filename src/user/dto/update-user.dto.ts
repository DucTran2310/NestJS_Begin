import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDTO) {}

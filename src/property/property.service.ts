import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throwIfNotFound } from 'src/common/exception/throw-helper';
import { baseResponse } from 'src/common/response/base-response';
import { CREATE_PROPERTY_SUCCESS } from 'src/constants/property.constants';
import { Property } from 'src/entities/property.entity';
import { CreatePropertyDto } from 'src/property/dto/createProperty.dto';
import { PaginationDTO } from 'src/property/dto/pagination.dto';
import { UpdatePropertyDto } from 'src/property/dto/updateProperty.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';
import { Repository } from 'typeorm';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property) private propertyRepo: Repository<Property>,
  ) {}

  async findAll(paginationDTO: PaginationDTO) {
    return await this.propertyRepo.find({
      skip: paginationDTO.skip,
      take: paginationDTO.limit ?? DEFAULT_PAGE_SIZE
    })
  }

  async findOne(id: number) {
    const property = await this.propertyRepo.findOne({ where: { id } });

    if (!property) {
      throw new NotFoundException(`Không tìm thấy thuộc tính với id: ${id}`);
    }

    return baseResponse(property);
  }

  async create(dto: CreatePropertyDto) {
    const existing = await this.propertyRepo.findOne({
      where: { name: dto.name },
    });

    if (existing) {
      throw new BadRequestException(
        `Property with name ${dto.name} already exists`,
      );
    }

    const newProperty = this.propertyRepo.create(dto); // tạo instance thôi, chưa lưu
    await this.propertyRepo.save(newProperty); // thực thi insert vào DB

    return baseResponse(newProperty, CREATE_PROPERTY_SUCCESS);
  }

  async update(id: number, dto: UpdatePropertyDto) {
    await this.propertyRepo.update({ id }, dto);

    const updatedProperty = await this.propertyRepo.findOne({ where: { id } });
    throwIfNotFound(updatedProperty, `Không tìm thấy thuộc tính với id: ${id}`);

    return baseResponse(updatedProperty);
  }

  async delete(id: number) {
    const property = await this.propertyRepo.findOne({ where: { id } });
  
    if (!property) {
      return baseResponse(null, `Không tìm thấy property với id = ${id}`, 200, false);
    }
  
    await this.propertyRepo.delete(id);
  
    return baseResponse(null, `Xóa property thành công`, 200, true);
  }
}

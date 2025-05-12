import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { CreatePropertyDto } from 'src/property/dto/createProperty.dto';


import { PaginationDTO } from 'src/property/dto/pagination.dto';
import { UpdatePropertyDto } from 'src/property/dto/updateProperty.dto';
import { ParseIdPipe } from 'src/property/pipes/parseIdPipe';
import { PropertyService } from 'src/property/property.service';

@Controller('property')
export class PropertyController {
  // Don't create your dependency, instead use DI in NestJS 
  constructor(private propertyService: PropertyService) {}

  @Get()
  findAll(@Query() paginationDTO: PaginationDTO) {
    return this.propertyService.findAll(paginationDTO);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id) {
    return this.propertyService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreatePropertyDto) {
    return this.propertyService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIdPipe) id,
    @Body()
    body: UpdatePropertyDto,
  ) {
    return this.propertyService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', ParseIdPipe) id) {
    return this.propertyService.delete(id);
  }
}
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TechniciansService } from './technicians.service';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { UpdateTechnicianDto } from './dto/update-technician.dto';
import { AddTechnicianServiceDto } from './dto/add-technician-service.dto';

@Controller('technicians')
export class TechniciansController {
  constructor(private readonly techniciansService: TechniciansService) {}

  @Post()
  create(@Body() createDto: CreateTechnicianDto) {
    return this.techniciansService.create(createDto);
  }

  @Get()
  findAll() {
    return this.techniciansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.techniciansService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateTechnicianDto) {
    return this.techniciansService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.techniciansService.remove(id);
  }

  @Post(':id/services')
  addService(
    @Param('id') id: string,
    @Body() addServiceDto: AddTechnicianServiceDto,
  ) {
    return this.techniciansService.addService(id, addServiceDto.serviceId);
  }

  @Delete(':id/services/:serviceId')
  removeService(@Param('id') id: string, @Param('serviceId') serviceId: string) {
    return this.techniciansService.removeService(id, serviceId);
  }
}

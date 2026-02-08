import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateServiceCategoryDto } from '../service-categories/dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from '../service-categories/dto/update-service-category.dto';
import { CreateServiceDto } from '../services/dto/create-service.dto';
import { UpdateServiceDto } from '../services/dto/update-service.dto';
import { AdminAssignTechnicianDto } from './dto/admin-assign-technician.dto';
import { AdminUpdateBookingStatusDto } from './dto/admin-update-booking-status.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('categories')
  createCategory(@Body() dto: CreateServiceCategoryDto) {
    return this.adminService.createCategory(dto);
  }

  @Get('categories')
  listCategories() {
    return this.adminService.listCategories();
  }

  @Get('categories/:id')
  getCategory(@Param('id') id: string) {
    return this.adminService.getCategory(id);
  }

  @Patch('categories/:id')
  updateCategory(@Param('id') id: string, @Body() dto: UpdateServiceCategoryDto) {
    return this.adminService.updateCategory(id, dto);
  }

  @Delete('categories/:id')
  deleteCategory(@Param('id') id: string) {
    return this.adminService.deleteCategory(id);
  }

  @Post('services')
  createService(@Body() dto: CreateServiceDto) {
    return this.adminService.createService(dto);
  }

  @Get('services')
  listServices(@Query('categoryId') categoryId?: string) {
    return this.adminService.listServices(categoryId);
  }

  @Get('services/:id')
  getService(@Param('id') id: string) {
    return this.adminService.getService(id);
  }

  @Patch('services/:id')
  updateService(@Param('id') id: string, @Body() dto: UpdateServiceDto) {
    return this.adminService.updateService(id, dto);
  }

  @Delete('services/:id')
  deleteService(@Param('id') id: string) {
    return this.adminService.deleteService(id);
  }

  @Get('bookings')
  listBookings() {
    return this.adminService.listBookings();
  }

  @Patch('bookings/:id/assign')
  assignTechnician(
    @Param('id') id: string,
    @Body() dto: AdminAssignTechnicianDto,
  ) {
    return this.adminService.assignTechnician(id, dto.technicianId);
  }

  @Patch('bookings/:id/status')
  updateBookingStatus(
    @Param('id') id: string,
    @Body() dto: AdminUpdateBookingStatusDto,
  ) {
    return this.adminService.updateBookingStatus(id, dto.status);
  }
}

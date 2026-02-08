import { Injectable } from '@nestjs/common';
import { BookingsService } from '../bookings/bookings.service';
import { ServiceCategoriesService } from '../service-categories/service-categories.service';
import { ServicesService } from '../services/services.service';
import { CreateServiceCategoryDto } from '../service-categories/dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from '../service-categories/dto/update-service-category.dto';
import { CreateServiceDto } from '../services/dto/create-service.dto';
import { UpdateServiceDto } from '../services/dto/update-service.dto';
import { BookingStatus } from '../common/enums/booking-status.enum';

@Injectable()
export class AdminService {
  constructor(
    private readonly categoriesService: ServiceCategoriesService,
    private readonly servicesService: ServicesService,
    private readonly bookingsService: BookingsService,
  ) {}

  createCategory(dto: CreateServiceCategoryDto) {
    return this.categoriesService.create(dto);
  }

  listCategories() {
    return this.categoriesService.findAll();
  }

  getCategory(id: string) {
    return this.categoriesService.findOne(id);
  }

  updateCategory(id: string, dto: UpdateServiceCategoryDto) {
    return this.categoriesService.update(id, dto);
  }

  deleteCategory(id: string) {
    return this.categoriesService.remove(id);
  }

  createService(dto: CreateServiceDto) {
    return this.servicesService.create(dto);
  }

  listServices(categoryId?: string) {
    return this.servicesService.findAll(categoryId);
  }

  getService(id: string) {
    return this.servicesService.findOne(id);
  }

  updateService(id: string, dto: UpdateServiceDto) {
    return this.servicesService.update(id, dto);
  }

  deleteService(id: string) {
    return this.servicesService.remove(id);
  }

  listBookings() {
    return this.bookingsService.findAll();
  }

  assignTechnician(bookingId: string, technicianId: string) {
    return this.bookingsService.assignTechnician(bookingId, technicianId);
  }

  updateBookingStatus(bookingId: string, status: BookingStatus) {
    return this.bookingsService.updateStatus(bookingId, status);
  }
}

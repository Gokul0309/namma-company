import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { ServiceCategoriesModule } from '../service-categories/service-categories.module';
import { ServicesModule } from '../services/services.module';
import { BookingsModule } from '../bookings/bookings.module';

@Module({
  imports: [ServiceCategoriesModule, ServicesModule, BookingsModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}

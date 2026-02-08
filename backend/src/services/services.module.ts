import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './service.entity';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { ServiceCategoriesModule } from '../service-categories/service-categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Service]), ServiceCategoriesModule],
  controllers: [ServicesController],
  providers: [ServicesService],
  exports: [ServicesService, TypeOrmModule],
})
export class ServicesModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechniciansController } from './technicians.controller';
import { TechniciansService } from './technicians.service';
import { Technician } from './technician.entity';
import { TechnicianService } from './technician-service.entity';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Technician, TechnicianService]),
    ServicesModule,
  ],
  controllers: [TechniciansController],
  providers: [TechniciansService],
  exports: [TechniciansService, TypeOrmModule],
})
export class TechniciansModule {}

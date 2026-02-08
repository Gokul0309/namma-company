import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Technician } from './technician.entity';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { UpdateTechnicianDto } from './dto/update-technician.dto';
import { TechnicianService } from './technician-service.entity';
import { ServicesService } from '../services/services.service';

@Injectable()
export class TechniciansService {
  constructor(
    @InjectRepository(Technician)
    private readonly techniciansRepository: Repository<Technician>,
    @InjectRepository(TechnicianService)
    private readonly technicianServicesRepository: Repository<TechnicianService>,
    private readonly servicesService: ServicesService,
  ) {}

  create(createDto: CreateTechnicianDto): Promise<Technician> {
    const technician = this.techniciansRepository.create(createDto);
    return this.techniciansRepository.save(technician);
  }

  findAll(): Promise<Technician[]> {
    return this.techniciansRepository.find({
      relations: {
        serviceMappings: {
          service: true,
        },
      },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Technician> {
    const technician = await this.techniciansRepository.findOne({
      where: { id },
      relations: {
        serviceMappings: {
          service: true,
        },
      },
    });

    if (!technician) {
      throw new NotFoundException('Technician not found');
    }

    return technician;
  }

  async update(
    id: string,
    updateDto: UpdateTechnicianDto,
  ): Promise<Technician> {
    const technician = await this.findOne(id);
    Object.assign(technician, updateDto);
    return this.techniciansRepository.save(technician);
  }

  async remove(id: string): Promise<void> {
    const technician = await this.findOne(id);
    await this.techniciansRepository.remove(technician);
  }

  async addService(technicianId: string, serviceId: string): Promise<TechnicianService> {
    await this.findOne(technicianId);
    await this.servicesService.findOne(serviceId);

    const existing = await this.technicianServicesRepository.findOne({
      where: { technicianId, serviceId },
    });

    if (existing) {
      throw new BadRequestException('Technician already mapped to this service');
    }

    const mapping = this.technicianServicesRepository.create({
      technicianId,
      serviceId,
    });

    return this.technicianServicesRepository.save(mapping);
  }

  async removeService(technicianId: string, serviceId: string): Promise<void> {
    const mapping = await this.technicianServicesRepository.findOne({
      where: { technicianId, serviceId },
    });

    if (!mapping) {
      throw new NotFoundException('Technician-service mapping not found');
    }

    await this.technicianServicesRepository.remove(mapping);
  }
}

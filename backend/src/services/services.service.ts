import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceCategoriesService } from '../service-categories/service-categories.service';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
    private readonly categoriesService: ServiceCategoriesService,
  ) {}

  async create(createDto: CreateServiceDto): Promise<Service> {
    await this.categoriesService.findOne(createDto.categoryId);
    const service = this.servicesRepository.create(createDto);
    return this.servicesRepository.save(service);
  }

  findAll(categoryId?: string): Promise<Service[]> {
    return this.servicesRepository.find({
      where: categoryId ? { categoryId } : {},
      relations: { category: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Service> {
    const service = await this.servicesRepository.findOne({
      where: { id },
      relations: { category: true },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    return service;
  }

  async update(id: string, updateDto: UpdateServiceDto): Promise<Service> {
    const service = await this.findOne(id);

    if (updateDto.categoryId) {
      await this.categoriesService.findOne(updateDto.categoryId);
    }

    Object.assign(service, updateDto);
    return this.servicesRepository.save(service);
  }

  async remove(id: string): Promise<void> {
    const service = await this.findOne(id);
    await this.servicesRepository.remove(service);
  }
}

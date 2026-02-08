import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';
import { ServiceCategory } from './service-category.entity';

@Injectable()
export class ServiceCategoriesService {
  constructor(
    @InjectRepository(ServiceCategory)
    private readonly categoriesRepository: Repository<ServiceCategory>,
  ) {}

  create(createDto: CreateServiceCategoryDto): Promise<ServiceCategory> {
    const category = this.categoriesRepository.create(createDto);
    return this.categoriesRepository.save(category);
  }

  findAll(): Promise<ServiceCategory[]> {
    return this.categoriesRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<ServiceCategory> {
    const category = await this.categoriesRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Service category not found');
    }
    return category;
  }

  async update(
    id: string,
    updateDto: UpdateServiceCategoryDto,
  ): Promise<ServiceCategory> {
    const category = await this.findOne(id);
    Object.assign(category, updateDto);
    return this.categoriesRepository.save(category);
  }

  async remove(id: string): Promise<void> {
    const category = await this.findOne(id);
    await this.categoriesRepository.remove(category);
  }
}

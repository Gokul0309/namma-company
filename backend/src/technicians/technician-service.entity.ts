import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Technician } from './technician.entity';
import { Service } from '../services/service.entity';

@Entity({ name: 'technician_services' })
@Unique(['technicianId', 'serviceId'])
export class TechnicianService {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'technician_id', type: 'uuid' })
  technicianId: string;

  @Column({ name: 'service_id', type: 'uuid' })
  serviceId: string;

  @ManyToOne(() => Technician, (technician) => technician.serviceMappings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'technician_id' })
  technician: Technician;

  @ManyToOne(() => Service, (service) => service.technicianMappings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

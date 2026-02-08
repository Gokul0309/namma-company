import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingStatus } from '../common/enums/booking-status.enum';
import { UsersService } from '../users/users.service';
import { ServicesService } from '../services/services.service';
import { TechniciansService } from '../technicians/technicians.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingsRepository: Repository<Booking>,
    private readonly usersService: UsersService,
    private readonly servicesService: ServicesService,
    private readonly techniciansService: TechniciansService,
  ) {}

  async create(createDto: CreateBookingDto): Promise<Booking> {
    const scheduledStart = new Date(createDto.scheduledStart);
    const scheduledEnd = new Date(createDto.scheduledEnd);

    if (scheduledEnd <= scheduledStart) {
      throw new BadRequestException('Scheduled end must be after scheduled start');
    }

    await this.servicesService.findOne(createDto.serviceId);

    const customer = await this.usersService.findOrCreateCustomer({
      fullName: createDto.customerName,
      email: createDto.customerEmail,
      phone: createDto.customerPhone,
    });

    const booking = this.bookingsRepository.create({
      customerId: customer.id,
      serviceId: createDto.serviceId,
      scheduledStart,
      scheduledEnd,
      address: createDto.address,
      notes: createDto.notes,
      status: BookingStatus.PENDING,
    });

    return this.bookingsRepository.save(booking);
  }

  findAll(): Promise<Booking[]> {
    return this.bookingsRepository.find({
      relations: { customer: true, service: true, technician: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Booking> {
    const booking = await this.bookingsRepository.findOne({
      where: { id },
      relations: { customer: true, service: true, technician: true },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return booking;
  }

  async assignTechnician(bookingId: string, technicianId: string): Promise<Booking> {
    const booking = await this.findOne(bookingId);
    await this.techniciansService.findOne(technicianId);

    const overlappingBooking = await this.bookingsRepository
      .createQueryBuilder('booking')
      .where('booking.technician_id = :technicianId', { technicianId })
      .andWhere('booking.id != :bookingId', { bookingId })
      .andWhere('booking.status IN (:...statuses)', {
        statuses: [BookingStatus.ASSIGNED, BookingStatus.IN_PROGRESS],
      })
      .andWhere('booking.scheduled_start < :scheduledEnd', {
        scheduledEnd: booking.scheduledEnd,
      })
      .andWhere('booking.scheduled_end > :scheduledStart', {
        scheduledStart: booking.scheduledStart,
      })
      .getOne();

    if (overlappingBooking) {
      throw new BadRequestException(
        'Technician is already assigned for an overlapping time slot',
      );
    }

    booking.technicianId = technicianId;
    booking.status = BookingStatus.ASSIGNED;

    return this.bookingsRepository.save(booking);
  }

  async updateStatus(bookingId: string, status: BookingStatus): Promise<Booking> {
    const booking = await this.findOne(bookingId);

    if (
      (status === BookingStatus.ASSIGNED || status === BookingStatus.IN_PROGRESS) &&
      !booking.technicianId
    ) {
      throw new BadRequestException(
        'Technician must be assigned before setting this status',
      );
    }

    booking.status = status;
    return this.bookingsRepository.save(booking);
  }
}

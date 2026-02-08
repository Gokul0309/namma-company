import { IsEnum } from 'class-validator';
import { BookingStatus } from '../../common/enums/booking-status.enum';

export class AdminUpdateBookingStatusDto {
  @IsEnum(BookingStatus)
  status: BookingStatus;
}

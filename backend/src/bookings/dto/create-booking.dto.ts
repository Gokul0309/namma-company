import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
} from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  serviceId: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 120)
  customerName: string;

  @IsEmail()
  customerEmail: string;

  @IsString()
  @Matches(/^[0-9+\-()\s]{8,20}$/)
  customerPhone: string;

  @IsDateString()
  scheduledStart: string;

  @IsDateString()
  scheduledEnd: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 255)
  address: string;

  @IsOptional()
  @IsString()
  @Length(0, 1000)
  notes?: string;
}

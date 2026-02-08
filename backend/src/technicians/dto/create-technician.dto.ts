import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateTechnicianDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 120)
  fullName: string;

  @IsString()
  @Matches(/^[0-9+\-()\s]{8,20}$/)
  phone: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

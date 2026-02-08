import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Length,
  Min,
} from 'class-validator';

export class CreateServiceDto {
  @IsUUID()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 120)
  name: string;

  @IsString()
  @IsOptional()
  @Length(0, 1000)
  description?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  basePrice: number;

  @IsInt()
  @Min(15)
  estimatedDurationMinutes: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

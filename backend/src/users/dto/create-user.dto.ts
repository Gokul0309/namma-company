import { IsEmail, IsEnum, IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { UserRole } from '../../common/enums/user-role.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 120)
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @Matches(/^[0-9+\-()\s]{8,20}$/)
  phone: string;

  @IsEnum(UserRole)
  role: UserRole;
}

import { IsUUID } from 'class-validator';

export class AddTechnicianServiceDto {
  @IsUUID()
  serviceId: string;
}

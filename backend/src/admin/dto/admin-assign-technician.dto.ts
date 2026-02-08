import { IsUUID } from 'class-validator';

export class AdminAssignTechnicianDto {
  @IsUUID()
  technicianId: string;
}

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateSupplierDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  name?: string;

  @IsString()
  company_registration?: string;

  @IsNumber()
  phone?: number;

  @IsString()
  website?: string;

  @IsString()
  email?: string;

  @IsString()
  representative_name?: string;
}

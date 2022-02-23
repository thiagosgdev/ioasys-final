import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAddressDTO {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsString()
  address?: string;

  @IsString()
  city?: string;

  @IsString()
  state?: string;

  @IsString()
  country?: string;

  @IsString()
  postal_code?: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;
}

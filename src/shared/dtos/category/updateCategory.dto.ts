import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoryDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

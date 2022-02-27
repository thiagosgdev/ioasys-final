import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteCategoryDTO {
  @IsString()
  @IsNotEmpty()
  id: string;
}

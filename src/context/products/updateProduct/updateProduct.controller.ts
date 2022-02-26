import { Body, Controller, HttpCode, HttpStatus, Put } from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { UpdateProductDTO } from 'src/shared/dtos/updateProduct.dto';
import { UpdateProductService } from './updateProduct.service';

@Controller('products')
export class UpdateProductController {
  constructor(private updateProductService: UpdateProductService) {}

  @Put()
  @HttpCode(HttpStatus.OK)
  public async create(@Body() data: UpdateProductDTO) {
    const product = await this.updateProductService.update(data);
    return instanceToInstance(product);
  }
}

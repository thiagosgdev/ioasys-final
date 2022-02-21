import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { CreateProductDTO } from 'src/shared/dto/createProduct.dto';
import { CreateProductService } from './createProducts.service';

@Controller('products')
export class CreateProductController {
  constructor(private createProductService: CreateProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() data: CreateProductDTO) {
    const product = await this.createProductService.create(data);
    return instanceToInstance(product);
  }
}

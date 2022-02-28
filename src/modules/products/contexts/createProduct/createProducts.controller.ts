import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';

import { instanceToInstance } from 'class-transformer';
import { CreateProductDTO } from 'src/shared/dtos/product/createProduct.dto';
import { Product } from 'src/shared/entities/product.entity';
import { CreateProductService } from './createProducts.service';

@Controller('products')
export class CreateProductController {
  constructor(
    private createProductService: CreateProductService, //private readonly validation: RequiredFieldValidation,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    type: Product,
  })
  @ApiBadRequestResponse({
    description: 'This will be returned when has validation error',
  })
  public async create(@Body() data: CreateProductDTO) {
    const product = await this.createProductService.create(data);
    return instanceToInstance(product);
  }
}

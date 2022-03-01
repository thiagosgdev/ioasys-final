import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Put,
  Res,
} from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { Response } from 'express';
import { UpdateProductDTO } from 'src/shared/dtos/product/updateProduct.dto';
import { UpdateProductService } from './updateProduct.service';

@Controller('products')
export class UpdateProductController {
  constructor(private updateProductService: UpdateProductService) {}

  @Put()
  @HttpCode(HttpStatus.OK)
  public async create(@Body() data: UpdateProductDTO, @Res() res: Response) {
    const product = await this.updateProductService.update(data);
    if (!product) {
      return res.status(400).send({ message: 'Bad Request!' });
    }
    return res.status(200).send(instanceToInstance(product));
  }
}

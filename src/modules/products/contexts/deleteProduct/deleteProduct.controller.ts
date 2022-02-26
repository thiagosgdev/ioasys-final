import {
  Controller,
  HttpCode,
  HttpStatus,
  HttpException,
  Delete,
  Query,
} from '@nestjs/common';

import { DeleteProductService } from './deleteProduct.service';

@Controller('products')
export class DeleteProductController {
  constructor(private deleteProductService: DeleteProductService) {}

  @Delete()
  @HttpCode(HttpStatus.OK)
  public async create(@Query('id') id: string) {
    try {
      await this.deleteProductService.delete(id);
    } catch (err) {
      throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

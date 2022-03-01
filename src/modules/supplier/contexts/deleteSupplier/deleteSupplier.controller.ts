import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';

import { DeleteSupplierService } from './deleteSupplier.service';

@Controller('suppliers')
export class DeleteSupplierController {
  constructor(private deleteSupplierService: DeleteSupplierService) {}

  @Delete()
  @HttpCode(HttpStatus.OK)
  public async handle(@Query('id') id: string) {
    await this.deleteSupplierService.delete(id);
    HttpStatus.OK;
  }
}

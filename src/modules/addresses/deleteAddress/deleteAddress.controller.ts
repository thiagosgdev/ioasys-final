import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';

import { DeleteAddressService } from './deleteAddress.service';

@Controller('addresses')
export class DeleteAddressController {
  constructor(private deleteAddressService: DeleteAddressService) {}

  @Delete()
  @HttpCode(HttpStatus.OK)
  public async create(@Query('id') id: string) {
    await this.deleteAddressService.delete(id);
  }
}

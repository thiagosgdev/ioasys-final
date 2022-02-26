import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { CreateAddressDTO } from 'src/shared/dtos/createAddress.dto';
import { CreateAddressService } from './createAddress.service';

@Controller('addresses')
export class CreateAddressController {
  constructor(private createAddressService: CreateAddressService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Res() res, @Body() data: CreateAddressDTO) {
    const id = res.locals.user;
    if (!id) {
      throw new HttpException(
        'User not authenticated!',
        HttpStatus.UNAUTHORIZED,
      );
    }
    data.user_id = id;
    const address = await this.createAddressService.create(data);
    return res.send(instanceToInstance(address));
  }
}

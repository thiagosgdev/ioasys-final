import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Put,
  Res,
} from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { UpdateAddressDTO } from 'src/shared/dtos/address/updateAddress.dto';
import { UpdateAddressService } from './updateAddress.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Address } from 'src/shared/entities/address.entity';
import { Response } from 'express';

@ApiTags('addresses')
@Controller('addresses')
export class UpdateAddressController {
  constructor(private updateAddressService: UpdateAddressService) {}

  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: Address,
  })
  @ApiBadRequestResponse({
    description: 'This will be returned when has validation error',
  })
  public async update(@Body() data: UpdateAddressDTO, @Res() res: Response) {
    try {
      const id = res.locals.user;
      if (!id) {
        return res.status(403).send({ message: 'User not authenticated' });
      }
      data.user_id = id;
      const address = await this.updateAddressService.update(data);
      if (!address) {
        return res
          .status(400)
          .send({ message: 'Bad Request! Verify the data provided!' });
      }
      return res.status(200).send(instanceToInstance(address));
    } catch (error) {
      return res.status(error.status).send(instanceToInstance(error.message));
    }
  }
}

import { Body, Controller, HttpCode, HttpStatus, Put } from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { UpdateAddressDTO } from 'src/shared/dtos/updateAddress.dto';
import { UpdateAddressService } from './updateAddress.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/shared/entities/user.entity';
import { Address } from 'src/shared/entities/address.entity';

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
  public async create(@Body() updateAddressBody: UpdateAddressDTO) {
    const address = await this.updateAddressService.update(updateAddressBody);
    return instanceToInstance(address);
  }
}

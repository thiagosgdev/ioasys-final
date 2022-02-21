import { Body, Controller, HttpCode, HttpStatus, Put } from '@nestjs/common';

import { instanceToInstance } from 'class-transformer';
import { UpdateAddressDTO } from 'src/shared/dto/updateAddress.dto';
import { UpdateAddressService } from './updateAddress.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/shared/entities/user.entity';

@ApiTags('address')
@Controller('address')
export class UpdateAddressController {
  constructor(private updateAddressService: UpdateAddressService) {}

  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'This will be returned when has validation error',
  })
  public async create(@Body() updateAddressBody: UpdateAddressDTO) {
    const address = await this.updateAddressService.update(updateAddressBody);
    return instanceToInstance(address);
  }
}

import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { DeleteAddressService } from './deleteAddress.service';

@Controller('addresses')
export class DeleteAddressController {
  constructor(private deleteAddressService: DeleteAddressService) {}

  @Delete()
  @HttpCode(HttpStatus.OK)
  public async handle(@Query('id') id: string, @Res() res: Response) {
    if (!id) {
      return res
        .status(400)
        .send({ message: 'Bad Request! Verify the id provided!' });
    }
    await this.deleteAddressService.delete(id);
    return res.status(200).send({});
  }
}

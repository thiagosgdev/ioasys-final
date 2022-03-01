import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';

import { DeleteOrderService } from './deleteOrder.service';

@Controller('orders')
export class DeleteOrderController {
  constructor(private deleteOrdersService: DeleteOrderService) {}

  @Delete()
  @HttpCode(HttpStatus.OK)
  public async delete(@Query('id') id: string) {
    await this.deleteOrdersService.delete(id);
  }
}

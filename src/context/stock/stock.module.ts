import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/typeorm/database.module';
import { CreateStockController } from './createStock/createStock.controller';
import { CreateStockService } from './createStock/createStock.service';
import { FindStockByProductController } from './findStockByProduct/findStockByProduct.controller';
import { FindStockByProductService } from './findStockByProduct/findStockByProduct.service';
import { ListStockController } from './listStock /listStock.controller';
import { ListStockService } from './listStock /listStock.service';

import { stockProviders } from './stock.provider';
import { UpdateStockController } from './updateStock/updateStock.controller';
import { UpdateStockService } from './updateStock/updateStock.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...stockProviders,
    CreateStockService,
    FindStockByProductService,
    UpdateStockService,
    ListStockService,
  ],
  controllers: [
    CreateStockController,
    FindStockByProductController,
    UpdateStockController,
    ListStockController,
  ],
})
export class StockModule {}

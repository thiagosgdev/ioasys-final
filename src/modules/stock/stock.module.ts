import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/infra/typeorm/database.module';
import { Stock } from 'src/shared/entities/stock.entity';
import { User } from 'src/shared/entities/user.entity';
import { EnsureAdminMiddleware } from 'src/shared/middleware/ensureAdmin.middleware';
import { StockRepo } from 'src/modules/stock/repository/stock.repository';
import { UserRepo } from 'src/modules/users/repository/user.repository';
import { CreateStockController } from './contexts/createStock/createStock.controller';
import { CreateStockService } from './contexts/createStock/createStock.service';
import { FindStockByProductController } from './contexts/findStockByProduct/findStockByProduct.controller';
import { FindStockByProductService } from './contexts/findStockByProduct/findStockByProduct.service';
import { ListStockController } from './contexts/listStock /listStock.controller';
import { ListStockService } from './contexts/listStock /listStock.service';

import { stockProviders } from './stock.provider';
import { UpdateStockController } from './contexts/updateStock/updateStock.controller';
import { UpdateStockService } from './contexts/updateStock/updateStock.service';
import { FindStockByIdService } from './contexts/findStockById/findStockById.service';
import { FindStockByIdController } from './contexts/findStockById/findStockById.controller';
import { DeleteStockController } from './contexts/deleteStock/deleteStock.controller';
import { DeleteStockService } from './contexts/deleteStock/deleteStock.service';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Stock, User])],
  providers: [
    ...stockProviders,
    UserRepo,
    CreateStockService,
    FindStockByProductService,
    UpdateStockService,
    ListStockService,
    StockRepo,
    FindStockByIdService,
    DeleteStockService,
  ],
  controllers: [
    CreateStockController,
    FindStockByProductController,
    UpdateStockController,
    ListStockController,
    FindStockByIdController,
    DeleteStockController,
  ],
})
export class StockModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(EnsureAdminMiddleware).forRoutes('stocks');
  }
}

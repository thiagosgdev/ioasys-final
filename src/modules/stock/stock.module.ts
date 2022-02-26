import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/infra/typeorm/database.module';
import { Stock } from 'src/shared/entities/stock.entity';
import { User } from 'src/shared/entities/user.entity';
import { EnsureAdminMiddleware } from 'src/shared/middleware/ensureAdmin.middleware';
import { StockRepo } from 'src/modules/stock/repository/stock.repository';
import { UserRepo } from 'src/shared/repositories/user.repository';
import { userProviders } from '../users/user.provider';
import { CreateStockController } from './contexts/createStock/createStock.controller';
import { CreateStockService } from './contexts/createStock/createStock.service';
import { FindStockByProductController } from './contexts/findStockByProduct/findStockByProduct.controller';
import { FindStockByProductService } from './contexts/findStockByProduct/findStockByProduct.service';
import { ListStockController } from './contexts/listStock /listStock.controller';
import { ListStockService } from './contexts/listStock /listStock.service';

import { stockProviders } from './stock.provider';
import { UpdateStockController } from './contexts/updateStock/updateStock.controller';
import { UpdateStockService } from './contexts/updateStock/updateStock.service';

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
  ],
  controllers: [
    CreateStockController,
    FindStockByProductController,
    UpdateStockController,
    ListStockController,
  ],
})
export class StockModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(EnsureAdminMiddleware).forRoutes('stocks');
  }
}

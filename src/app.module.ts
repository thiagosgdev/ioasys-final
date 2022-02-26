import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';

import * as winston from 'winston';
import { CategoryModule } from './modules/categories/category.module';
import { SupplierModule } from './modules/supplier/supplier.module';
import { ProductModule } from './modules/products/products.module';
import { StockModule } from './modules/stock/stock.module';
import { OrderModule } from './modules/orders/orders.module';
import { ShipmentModule } from './modules/shipments/shipments.module';
import { AddressModule } from './modules/addresses/address.module';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
      ],
    }),
    TypeOrmModule.forRoot(),
    UserModule,
    CategoryModule,
    SupplierModule,
    ProductModule,
    StockModule,
    OrderModule,
    ShipmentModule,
    AddressModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

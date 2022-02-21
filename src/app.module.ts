import { Module } from '@nestjs/common';
import { UserModule } from './context/users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';

import * as winston from 'winston';
import { CategoryModule } from './context/categories/category.module';
import { SupplierModule } from './context/supplier/supplier.module';
import { ProductModule } from './context/products/products.module';
import { StockModule } from './context/stock/stock.module';
import { OrderModule } from './context/orders/orders.module';
import { ShipmentModule } from './context/shipments/shipments.module';
import { AddressModule } from './context/addresses/address.module';

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

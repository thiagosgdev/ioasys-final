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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

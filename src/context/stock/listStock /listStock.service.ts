import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Stock } from 'src/shared/entities/stock.entity';
import { StockRepo } from 'src/shared/repositories/stock.repository';
import { Repository } from 'typeorm';

@Injectable()
export class ListStockService {
  constructor(private stockRepository: StockRepo) {}

  async list(): Promise<Stock[]> {
    const stocks = await this.stockRepository.list();
    if (stocks.length < 0) {
      throw new HttpException('Not stock Found!', HttpStatus.NOT_FOUND);
    }
    return stocks;
  }
}

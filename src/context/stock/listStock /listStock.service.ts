import { Injectable, Inject } from '@nestjs/common';
import { Stock } from 'src/shared/entities/stock.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ListStockService {
  constructor(
    @Inject('STOCK_REPOSITORY')
    private stockRepository: Repository<Stock>,
  ) {}

  async list(): Promise<Stock[]> {
    const stocks = await this.stockRepository.find();

    return stocks;
  }
}

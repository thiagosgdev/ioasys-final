import { Injectable } from '@nestjs/common';
import { Stock } from 'src/shared/entities/stock.entity';
import { StockRepo } from 'src/shared/repositories/stock.repository';

@Injectable()
export class FindStockByProductService {
  constructor(private stockRepository: StockRepo) {}

  async find(id: string): Promise<Stock> {
    const stock = await this.stockRepository.findByProduct(id);
    return stock;
  }
}

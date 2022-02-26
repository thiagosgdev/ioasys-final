import { Injectable } from '@nestjs/common';
import { Stock } from 'src/shared/entities/stock.entity';
import { StockRepo } from 'src/modules/stock/repository/stock.repository';

@Injectable()
export class FindStockByProductService {
  constructor(private stockRepository: StockRepo) {}

  async find(id: string): Promise<Stock> {
    const stock = await this.stockRepository.findByProduct(id);
    return stock;
  }
}

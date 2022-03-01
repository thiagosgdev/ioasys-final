import { Injectable } from '@nestjs/common';
import { Stock } from 'src/shared/entities/stock.entity';
import { StockRepo } from 'src/modules/stock/repository/stock.repository';

@Injectable()
export class FindStockByIdService {
  constructor(private stockRepository: StockRepo) {}

  async find(id: string): Promise<Stock> {
    const stock = await this.stockRepository.findById(id);
    if (!stock) {
      return null;
    }
    return stock;
  }
}

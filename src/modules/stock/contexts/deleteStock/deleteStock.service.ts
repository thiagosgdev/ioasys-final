import { Injectable } from '@nestjs/common';
import { Stock } from 'src/shared/entities/stock.entity';
import { StockRepo } from 'src/modules/stock/repository/stock.repository';

@Injectable()
export class DeleteStockService {
  constructor(private stockRepository: StockRepo) {}

  async delete(id: string): Promise<void> {
    await this.stockRepository.delete(id);
  }
}

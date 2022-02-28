import { Injectable } from '@nestjs/common';
import { UpdateStockDTO } from 'src/shared/dtos/stock/updateStock.dto';
import { Stock } from 'src/shared/entities/stock.entity';
import { StockRepo } from 'src/modules/stock/repository/stock.repository';

@Injectable()
export class UpdateStockService {
  constructor(private stockRepository: StockRepo) {}

  async update(data: UpdateStockDTO): Promise<Stock> {
    const stock = await this.stockRepository.update(data);
    return stock;
  }
}

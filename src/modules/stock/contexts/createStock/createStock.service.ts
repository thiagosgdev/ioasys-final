import { ConflictException, Injectable } from '@nestjs/common';
import { CreateStockDTO } from 'src/shared/dtos/stock/createStock.dto';
import { Stock } from 'src/shared/entities/stock.entity';
import { StockRepo } from 'src/modules/stock/repository/stock.repository';

@Injectable()
export class CreateStockService {
  constructor(private stockRepository: StockRepo) {}

  async create(data: CreateStockDTO): Promise<Stock> {
    const productExists = await this.stockRepository.findByProduct(
      data.product_id,
    );
    if (productExists) {
      throw new ConflictException('Product already has an stock!');
    }
    const stock = await this.stockRepository.create(data);
    return stock;
  }
}

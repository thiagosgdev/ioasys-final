import { Injectable, Inject } from '@nestjs/common';
import { Stock } from 'src/shared/entities/stock.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindStockByProductService {
  constructor(
    @Inject('STOCK_REPOSITORY')
    private stockRepository: Repository<Stock>,
  ) {}

  async find(id: string): Promise<Stock> {
    const stock = await this.stockRepository.findOne({
      where: { product_id: id },
      relations: ['product'],
    });

    return stock;
  }
}
